<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user-store'
import { FILTERS, type Filter, type User } from '@/interfaces/interface-user'

import userContainer from '@/components/user-container.vue'
import paginationControls from '@/components/button-arrow.vue'
import userDetailModal from '@/components/user-detail-modal.vue'

// Store setup
const store = useUserStore()
const { currentPage, activeFilter, isLoading, error, selectedUser } = storeToRefs(store)

// Current page users from store.users (accessed directly to preserve reactivity with dynamic keys)
const users = computed(() => store.currentUsers || []) // fallback to empty array

const leftColumnUsers = computed(() => users.value.slice(0, 5))
const rightColumnUsers = computed(() => users.value.slice(5))

const showPrevButton = computed(() => currentPage.value > 1)

// On mount: start a new session and fetch first users
onMounted(() => {
  store.purgeAndResetSession()
  store.fetchUsers(1)
})

// Event Handlers
function handleNext() {
  store.fetchUsers(currentPage.value + 1)
}

function handlePrev() {
  if (currentPage.value > 1) store.fetchUsers(currentPage.value - 1)
}

function handleShowDetails(user: User) {
  store.selectUser(user)
}

function onFilterChanged(newFilter: Filter) {
  store.setFilter(newFilter)
}
function handleRefresh() {
  store.refresh()
}
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">WELCOME TO RANDOM USER APP!</h1>
    <p class="gender-label">
      Showing users:
      <strong>{{ activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1) }}</strong>
    </p>

    <!-- Filter Buttons -->
    <div class="filter-container">
      <span class="filter-label">FILTER:</span>
      <button
        v-for="filter in Object.values(FILTERS)"
        :key="filter"
        @click="onFilterChanged(filter)"
        class="filter-button"
        :class="{ active: activeFilter === filter }"
        :disabled="isLoading"
      >
        {{ filter.charAt(0).toUpperCase() + filter.slice(1) }}
      </button>
      <button @click="handleRefresh" class="filter-button" :disabled="isLoading">Refresh</button>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <div v-if="isLoading" class="loading">Loading users...</div>

      <div v-else-if="error" class="error">
        Error: {{ error }}
        <button @click="store.fetchUsers(currentPage)">Retry</button>
      </div>

      <template v-else>
        <div v-if="users.length === 0" class="no-users">No users found.</div>
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
      </template>
    </div>

    <!-- Pagination Controls -->
    <paginationControls
      v-if="!store.error"
      :current-page="currentPage"
      :is-loading="isLoading"
      :show-prev="showPrevButton"
      @prev="handlePrev"
      @next="handleNext"
    />

    <!-- User Detail Modal -->
    <userDetailModal v-if="selectedUser" :user="selectedUser" @close="store.clearSelectedUser()" />
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
  margin-bottom: 20px;
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
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  /* background-color: #7a6e69; */
  background-color: #998b86;
}

.filter-button.active {
  background-color: #f2eae4;
  color: #000;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
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
