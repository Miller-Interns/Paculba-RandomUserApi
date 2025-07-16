<script setup lang="ts">
const emit = defineEmits<{
  (e: 'filter-selected', filter: 'ALL' | 'MALE' | 'FEMALE'): void
}>()

function selectFilter(filter: 'ALL' | 'MALE' | 'FEMALE') {
  emit('filter-selected', filter)
}


</script>

<template>
  <div class="filter-wrapper">
    <button @click="selectFilter('ALL')">All</button>
    <button @click="selectFilter('MALE')">Male</button>
    <button @click="selectFilter('FEMALE')">Female</button>
  </div>
</template>

<style scoped>
.filter-wrapper {
  position: relative;
  display: inline-block;
}

.filter-button {
  background-color: #8a7d78;
  color: #eae3dd;
  border: none;
  border-radius: 20px;
  padding: 10px 30px;
  min-width: 120px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-right: 8px;
}

.filter-button:last-child {
  margin-right: 0;
}


.filter-button:hover {
  background-color: #7a6e69;
}

.filter-button:active {
  transform: translateY(1px); /* Slight push effect when clicked */
}

/* The dropdown list styling */
.options-list {
  position: absolute;
  top: 100%; /* Position it right below the button */
  left: 0;
  width: 100%;
  background-color: #eae3dd;
  border: 1px solid #7a6e69;
  border-radius: 10px;
  list-style: none;
  padding: 5px 0;
  margin-top: 5px; /* A little space between the button and list */
  z-index: 10; /* Ensure it appears above other content */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  overflow: hidden; /* Ensures children obey the border-radius */
}

.option-item {
  color: #2d2d2d;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.option-item:hover {
  background-color: #dcd3ca;
}
</style>
