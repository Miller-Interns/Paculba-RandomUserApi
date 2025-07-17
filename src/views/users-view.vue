<script setup lang="ts">
import userContainer from '@/components/user-container.vue'
import paginationControls from '@/components/button-arrow.vue'
import userDetailModal from '@/components/user-detail-modal.vue'
import { useUserStore } from '@/stores/user-store.ts'
import { useUsers } from '@/composables/useUsers.ts'
import { computed, onMounted, nextTick } from 'vue'
import { FILTERS, type Filter, type User } from '@/interfaces/interface-user'

const store = useUserStore()
const { fetchUsers } = useUsers()

// Computed properties for displaying data
const currentUsers = computed(() => store.users[store.currentPage] || [])
const leftColumnUsers = computed(() => currentUsers.value.slice(0, 5))
const rightColumnUsers = computed(() => currentUsers.value.slice(5, 10))
const showPrevButton = computed(() => store.currentPage > 1)

// Fetch initial data on component mount
onMounted(() => {
  if (!currentUsers.value.length) {
    fetchUsers(1)
  }
})

// --- Methods for handling user interaction ---

const handleNext = () => {
  fetchUsers(store.currentPage + 1)
}

const handlePrev = () => {
  if (store.currentPage > 1) {
    fetchUsers(store.currentPage - 1)
  }
}

function handleShowDetails(user: User) {
  store.selectUser(user)
}

// Handles the filter change event
function onFilterChanged(newFilter: Filter) {
  // 1. Do nothing if the filter hasn't changed
  if (store.activeFilter !== newFilter) {
    store.setFilter(newFilter)
    fetchUsers(1)
  }
}
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">WELCOME TO RANDOM USER APP!</h1>

    <div class="filter-container">
      <span class="filter-label">FILTER:</span>
      <button
        @click.prevent="onFilterChanged(FILTERS.ALL)"
        class="filter-button"
        :class="{ active: store.activeFilter === FILTERS.ALL }"
      >
        All
      </button>

      <button
        @click.prevent="onFilterChanged(FILTERS.FEMALE)"
        class="filter-button"
        :class="{ active: store.activeFilter === FILTERS.FEMALE }"
      >
        Female
      </button>

      <button
        @click.prevent="onFilterChanged(FILTERS.MALE)"
        class="filter-button"
        :class="{ active: store.activeFilter === FILTERS.MALE }"
      >
        Male
      </button>
    </div>

    <div class="main-content">
      <!-- FIXED: Combined the loading section into one -->
      <div v-if="store.isLoading" class="loading">
        <!-- Optional: Add a spinner or skeleton loader here -->
        Loading users...
      </div>

      <div v-if="store.error" class="error">
        Error: {{ store.error }}
        <button @click="fetchUsers(store.currentPage)">Retry</button>
      </div>

      <!-- This content will show correctly now -->
      <template v-if="!store.isLoading && !store.error">
        <!-- ADD THIS BLOCK to handle the empty state -->
        <div v-if="currentUsers.length === 0" class="no-users">No users found.</div>

        <div class="user-lists-grid">
          <!-- Left Column -->
          <div class="user-column">
            <userContainer
              v-for="user in leftColumnUsers"
              :key="user.login.uuid"
              :user="user"
              @show-details="handleShowDetails"
            />
          </div>

          <!-- Right Column -->
          <div class="user-column">
            <userContainer
              v-for="user in rightColumnUsers"
              :key="user.login.uuid"
              :user="user"
              @show-details="handleShowDetails"
            />
          </div>
        </div>
        <!-- ✅ CORRECTION: ADDED THE MISSING CLOSING DIV HERE -->

        <paginationControls
          :current-page="store.currentPage"
          :is-loading="store.isLoading"
          :show-prev="showPrevButton"
          @prev="handlePrev"
          @next="handleNext"
        />
        <userDetailModal
          v-if="store.selectedUser"
          :user="store.selectedUser"
          @close="store.clearSelectedUser()"
        />
      </template>
    </div>
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
  min-height: 300px; /* Reserve space while loading */
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
  padding: 8px 25px; /* Fine-tuned padding */
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #7a6e69;
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
