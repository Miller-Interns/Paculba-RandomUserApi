<script setup lang="ts">
import type { User } from '@/interfaces/interface-user.ts'

const props = defineProps<{
  user: User
}>()

const emit = defineEmits(['show-details'])

function handleContainerClick() {
  emit('show-details', props.user)
}
</script>

<template>
  <div class="user-container" @click="handleContainerClick">
    <div class="avatar">
      <img
        v-if="user.picture.medium"
        :src="user.picture.medium"
        :alt="`${user.name.first}'s avatar`"
        class="avatar-image"
      />
    </div>

    <span class="user-name">{{ user.name.first }} {{ user.name.last }}</span>
  </div>
</template>

<style scoped>
.user-container {
  background-color: #eae3dd;
  width: 100%;
  height: 55px;
  border-radius: 27.5px;
  display: flex;
  align-items: center;
  padding: 0 7px;
  gap: 12px;
  box-sizing: border-box;
  cursor: pointer;
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.user-container:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.avatar {
  width: 41px;
  height: 41px;
  border-radius: 50%;
  background-color: #8a7d78;
  flex-shrink: 0;
  overflow: hidden;
}

.avatar-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.user-name {
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #3f3836;
  font-size: 0.9rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
