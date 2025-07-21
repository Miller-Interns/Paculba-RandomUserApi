<script setup lang="ts">
import { onMounted, ref, watch, computed } from 'vue'
import { useUserStore } from '@/stores/user-store.ts'
import type { User } from '@/interfaces/interface-user'
import { useUserFetch } from '@/composables/useUserFetch.ts'

import UserContainer from '@/components/user-container.vue'
import PaginationControls from '@/components/button-arrow.vue'
import UserDetailModal from '@/components/user-detail-modal.vue'

const userStore = useUserStore()
const { users, fetchUsers, isLoading } = useUserFetch()
const showModal = ref(false)
const selectedUser = ref<User | null>(null)

const loadUsers = async () => {
  const key = `users-page-${userStore.currentPage}${userStore.genderFilter ? `-${userStore.genderFilter}` : ''}`

  const cached = userStore.getUsersFromStorage(key)
  if (cached) {
    users.value = cached
  } else {
    await fetchUsers(userStore.currentPage, userStore.genderFilter)
    userStore.setUsers(key, users.value)
  }
}

const handleGenderChange = async (gender: string) => {
  userStore.resetSession()
  userStore.setGenderFilter(gender)
  await loadUsers()
}

const handlePageChange = (direction: 'prev' | 'next') => {
  if (direction === 'prev' && userStore.currentPage > 1) {
    userStore.currentPage--
  } else if (direction === 'next') {
    userStore.currentPage++
  }
  loadUsers()
}

const handleShowDetails = (user: User) => {
  selectedUser.value = user
  showModal.value = true
}

const handleCloseModal = () => {
  selectedUser.value = null
  showModal.value = false
}

const displayedUsers = computed(() => users.value || [])
const leftColumnUsers = computed(() => displayedUsers.value.slice(0, 5))
const rightColumnUsers = computed(() => displayedUsers.value.slice(5, 10))

const currentPage = computed(() => userStore.currentPage)
const showPrevButton = computed(() => userStore.currentPage > 1)
const activeFilter = computed(() => userStore.genderFilter || 'All')

const goPreviousPage = () => handlePageChange('prev')
const goNextPage = () => handlePageChange('next')

onMounted(() => {
  userStore.resetSession()
  loadUsers()
})

watch(() => userStore.genderFilter, loadUsers)
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">WELCOME TO RANDOM USER APP!</h1>

    <div class="filter-container">
      <span class="filter-label">Filter:</span>
      <button
        class="filter-button"
        :class="{ active: activeFilter === 'All' }"
        @click="handleGenderChange('')"
      >
        All
      </button>
      <button
        class="filter-button"
        :class="{ active: activeFilter === 'male' }"
        @click="handleGenderChange('male')"
      >
        Male
      </button>
      <button
        class="filter-button"
        :class="{ active: activeFilter === 'female' }"
        @click="handleGenderChange('female')"
      >
        Female
      </button>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div v-if="isLoading && displayedUsers.length === 0" class="loading">Loading users...</div>

      <div v-else-if="!isLoading && displayedUsers.length === 0" class="no-users">
        No users found.
      </div>

      <div v-else class="user-lists-grid">
        <div class="user-column">
          <userContainer
            v-for="user in leftColumnUsers"
            :key="user.login.uuid"
            :user="user"
            @show-details="handleShowDetails"
          />
        </div>

        <div class="user-column">
          <userContainer
            v-for="user in rightColumnUsers"
            :key="user.login.uuid"
            :user="user"
            @show-details="handleShowDetails"
          />
        </div>
      </div>
    </div>

    <paginationControls
      v-if="displayedUsers.length > 0"
      :current-page="currentPage"
      :is-loading="isLoading"
      :show-prev="showPrevButton"
      @prev="goPreviousPage"
      @next="goNextPage"
    />

    <userDetailModal v-if="selectedUser" :user="selectedUser" @close="handleCloseModal" />
  </div>
</template>

<style scoped>
.app-container {
  width: 100%;
  max-width: 900px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.app-title {
  font-family: 'Poppins', sans-serif;
  color: #eae3dd;
  text-align: center;
  margin: 0;
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  letter-spacing: 1.5px;
  margin-top: 20px;
  margin-bottom: 10px;
}
.page-indicator {
  font-family: 'Poppins', sans-serif;
  color: #eae3dd;
  text-align: center;
  margin: 0;
}

.main-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-lists-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  width: 100%;
  margin-bottom: 1px;
}

.user-column {
  display: flex;
  flex-direction: column;

  gap: 18px;
}

.loading,
.error {
  color: #eae3dd;
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.filter-container {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.filter-label {
  font-size: 1.1rem;
  font-weight: bold;
  color: #eae3dd;
  letter-spacing: 1px;
}

.filter-button {
  background-color: #8a7d78;
  color: #eae3dd;
  border: none;
  border-radius: 20px;
  padding: 8px 25px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #998b86;
}

.filter-button.active {
  background-color: #f2eae4;
  color: #000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  font-weight: bold;
}

.filter-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.no-users {
  color: #8a7d78;
  font-size: 1.2rem;
  text-align: center;
  width: 100%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
