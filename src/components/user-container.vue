<script setup lang="ts"></script>

<template>
  
  <div v-for="n in 5" :key="`right-${n}`" class="user-card-with-avatar">
    <div class="avatar-placeholder"></div>
  </div>
  <div class="bottom-indicator"></div>
</template>

<style scoped>
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
