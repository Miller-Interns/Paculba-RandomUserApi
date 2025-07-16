<script setup lang="ts">
import prevButton from '@/icons/icon-left.vue'
import nextButton from '@/icons/icon-right.vue'
import { defineProps, defineEmits } from 'vue'

defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  showPrev: {
    type: Boolean,
    default: true
  }
})



const emit = defineEmits(['prev', 'next'])
</script>

<template>
  <div class="pagination-controls">
    <button
      v-if="showPrev"
      class="pagination-button"
      :disabled="isLoading"
      @click="emit('prev')"
      aria-label="Previous page"
    >
      <prevButton class="icon" />
    </button>
    
    <span class="page-indicator">Page {{ currentPage }}</span>
    
    <button
      class="pagination-button"
      :disabled="isLoading"
      @click="emit('next')"
      aria-label="Next page"
    >
      <nextButton class="icon" />
    </button>
  </div>
</template>

<style scoped>
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-top: 2rem;
}


.pagination-button{
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: #8a7d78;
  color:white;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:all 0.2s ease;
 
}

.pagination-button:hover:not(:disabled) {
 background-color: #2d2d2d;
  transform: scale(1.05);
}

.pagination-button:active:not(:disabled) {
  transform: scale(0.95);
}

.pagination-button:disabled {
  background-color: var(--color-gray-light);
  cursor: not-allowed;
  opacity: 0.7;
}

.icon {
  width: 1.25rem;
  height: 1.25rem;
}

.page-indicator {
  min-width: 5rem;
  text-align: center;
  font-weight: 500;
  color: var(--color-text);
}

</style>
