<script setup lang="ts">
import userContainer from '@/components/user-container.vue'
import paginationControls from '@/components/button-arrow.vue'
import buttonFilter from '@/components/button-filter.vue'
import { useUserStore } from '@/stores/user-store.ts'
import { useUsers } from '@/composables/useUsers.ts'
import { ref, computed, onMounted } from 'vue'

const activeFilter = ref<'ALL' | 'MALE' | 'FEMALE'>('ALL')

const store = useUserStore()
const { fetchUsers } = useUsers()
const isInitialLoad = ref(true)

onMounted(async () => {
  await fetchUsers(store.currentPage)
  isInitialLoad.value = false
})

const currentUsers = computed(() => store.users[store.currentPage] || [])

const navigate = (direction: 'left' | 'right') => {
  if (store.isLoading) return

  const newPage = direction === 'left' ? store.currentPage - 1 : store.currentPage + 1

  if (newPage >= 1) {
    fetchUsers(newPage)
  }
}

const showPrevButton = computed(() => {
  return !isInitialLoad.value && store.currentPage > 1
})

function runFilterFunction(selectedFilter: 'ALL' | 'MALE' | 'FEMALE') {
  console.log(`The function was run! Filtering by: ${selectedFilter}`)
  activeFilter.value = selectedFilter

  // fetchUsers({ gender: selectedFilter });
}

// fetchUsers(store.currentPage)

const handleNext = () => {
 if (!store.isLoading) {
    fetchUsers(store.currentPage + 1)
  }
}

const handlePrev = () => {
 if (store.currentPage > 1 && !store.isLoading) {
    fetchUsers(store.currentPage - 1)
  }
}
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">WELCOME TO RANDOM USER APP!</h1>
    <h2>User List - Page {{ store.currentPage }}</h2>

    <div class="filter-container">
      <span class="filter-label">FILTER:</span>
      <buttonFilter @filter-selected="runFilterFunction" />
    </div>

    <div class="user-lists">
      <div v-if="store.isLoading" class="loading">Loading users...</div>
      <div v-if="store.error" class="error">
        Error: {{ store.error }}
        <button @click="fetchUsers(store.currentPage)">Retry</button>
      </div>

      <div v-if="!store.isLoading && !store.error">
        <div class="user-list">
          <div v-for="user in currentUsers" :key="user.login.uuid" class="user-card">
            <img
              :src="user.picture.medium"
              :alt="`${user.name.first}'s thumbnail`"
              class="user-avatar"
            />
            <div class="user-details">
              <h2>{{ user.name.title }} {{ user.name.first }} {{ user.name.last }}</h2>
              <p><strong>Email:</strong> {{ user.email }}</p>
              <p>
                <strong>Location:</strong> {{ user.location.city }}, {{ user.location.country }}
              </p>
            </div>
          </div>
        </div>

       

        <!-- Left Column -->
        <!-- <div class="user-column">
        <userContainer />
      </div> -->

        <!-- Right Column -->
        <!-- <div class="user-column">
        <userContainer />
      </div> -->

       <paginationControls
      :current-page="store.currentPage"
      :is-loading="store.isLoading"
      :show-prev="showPrevButton"
      @prev="handlePrev"
      @next="handleNext"
    />

      </div>
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
  gap: 30px;
}

.app-title {
  font-family: 'Poppins';
  font-size: clamp(2rem, 5vw, 3rem);
  font-weight: 400;
  color: #eae3dd;
  letter-spacing: 1.5px;
  text-align: center;
  margin: 0;
}

.filter-container {
  display: flex;
  align-items: center;
  gap: 15px;
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
  padding: 10px 30px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.filter-button:hover {
  background-color: #7a6e69;
}

.user-lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  width: 100%;
}

.user-column {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
}
</style>
