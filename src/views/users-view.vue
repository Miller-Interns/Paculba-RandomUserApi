<script setup lang="ts">
import userContainer from '@/components/user-container.vue'
import paginationControls from '@/components/button-arrow.vue'
// import buttonFilter from '@/components/button-filter.vue'
import { useUserStore } from '@/stores/user-store.ts'
import { useUsers } from '@/composables/useUsers.ts'
import { ref, computed, onMounted } from 'vue'

const store = useUserStore()
const { fetchUsers } = useUsers()

const activeFilter = ref<'ALL' | 'MALE' | 'FEMALE'>('ALL')

const isInitialLoad = ref(true)

const currentUsers = computed(() => store.users[store.currentPage] || [])
const leftColumnUsers = computed(() => currentUsers.value.slice(0, 5))
const rightColumnUsers = computed(() => currentUsers.value.slice(5, 10))
const showPrevButton = computed(() => !isInitialLoad.value && store.currentPage > 1)

onMounted(async () => {
  // Only fetch if there are no users for page 1
  if (Object.keys(store.users).length === 0) {
    fetchUsers(1)
  }
})

// --- Methods ---
const handleNext = () => {
  fetchUsers(store.currentPage + 1)
}

const handlePrev = () => {
  fetchUsers(store.currentPage - 1)
}

async function runFilterFunction(selectedFilter: 'ALL' | 'MALE' | 'FEMALE') {
  console.log(`Filtering by: ${selectedFilter}`)
  activeFilter.value = selectedFilter
  // Future logic for filtering would go here

  // 1. Purge all existing user data from the store and session storage.
  store.purgeUsers()

  // 2. Fetch the first page of users with the new filter criteria.
  await fetchUsers(1, { gender: selectedFilter })
}
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">WELCOME TO RANDOM USER APP!</h1>

    <div class="filter-container">
      <span class="filter-label">FILTER:</span>
      <button class="filter-button" @click="runFilterFunction('ALL')">
        {{ activeFilter }}
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
            <userContainer v-for="user in leftColumnUsers" :key="user.login.uuid" :user="user" />
          </div>

          <!-- Right Column -->
          <div class="user-column">
            <userContainer v-for="user in rightColumnUsers" :key="user.login.uuid" :user="user" />
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
