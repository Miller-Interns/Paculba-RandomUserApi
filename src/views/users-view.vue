<script setup lang="ts">
import userContainer from '@/components/user-container.vue'
import buttonFormats from '@/components/button-filter.vue'
import { ref } from 'vue'

const activeFilter = ref<'ALL' | 'MALE' | 'FEMALE'>('ALL')

function runFilterFunction(selectedFilter: 'ALL' | 'MALE' | 'FEMALE') {
  console.log(`The function was run! Filtering by: ${selectedFilter}`)
  activeFilter.value = selectedFilter

  // fetchUsers({ gender: selectedFilter });
}
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">WELCOME TO RANDOM USER APP!</h1>

    <div class="filter-container">
      <span class="filter-label">FILTER:</span>
      <buttonFormats @filter-selected="runFilterFunction" />
    </div>

    <div class="user-lists">
      <!-- Left Column -->
      <div class="user-column">
        <userContainer />
      </div>

      <!-- Right Column -->
      <div class="user-column">
        <userContainer />
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
