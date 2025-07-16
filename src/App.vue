<script setup lang="ts">
import { RouterView } from 'vue-router'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <nav>
    <a href =  "#" class = "logo">  </a>
  
  </nav>
  <div class="app-wrapper">
  <RouterView />
  </div>

</template>

<style scoped>
.app-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
  box-sizing: border-box;
}
</style>
