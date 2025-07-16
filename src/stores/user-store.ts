import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { User } from '@/interfaces/interface-user.ts'

export const useUserStore = defineStore('user', () => {
  const users = ref<Record<number, User[]>>({}) // Cache users by page
  const currentPage = ref(1)
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  function addUsers(page: number, newUsers: User[]) {
    users.value[page] = newUsers
  }

  function setPage(page: number) {
    currentPage.value = page
  }

  return {
    users,
    currentPage,
    isLoading,
    error,
    addUsers,
    setPage
  }
})