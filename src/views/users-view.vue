<script setup lang="ts">
// export default {
//   name: 'RandomUserApp',
// };
</script>

<template>
  <div class="app-container">
    <h1 class="app-title">WELCOME TO RANDOM USER APP!</h1>

    <div class="filter-container">
      <span class="filter-label">FILTER:</span>
      <button class="filter-button">ALL</button>
    </div>

    <div class="user-lists">
      <!-- Left Column -->
      <div class="user-column">
        <div v-for="n in 6" :key="`left-${n}`" class="user-card-simple"></div>
        <div class="bottom-indicator"></div>
      </div>

      <!-- Right Column -->
      <div class="user-column">
        <div v-for="n in 6" :key="`right-${n}`" class="user-card-with-avatar">
          <div class="avatar-placeholder"></div>
        </div>
        <div class="bottom-indicator"></div>
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
  font-family: 'Bungee', cursive;
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

.user-card-simple,
.user-card-with-avatar {
  background-color: #eae3dd;
  width: 100%;
  height: 55px;
  border-radius: 27.5px; /* height / 2 */
}

.user-card-with-avatar {
  display: flex;
  align-items: center;
  padding: 0 7px;
}

.avatar-placeholder {
  width: 41px; /* Slightly smaller than height to fit inside */
  height: 41px;
  background-color: #8a7d78;
  border-radius: 50%;
}

.bottom-indicator {
  width: 28px;
  height: 28px;
  background-color: #8a7d78;
  border-radius: 50%;
  margin-top: 10px;
}
</style>
