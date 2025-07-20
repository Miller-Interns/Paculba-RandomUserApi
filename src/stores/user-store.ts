import { defineStore } from 'pinia'
import type { User } from '@/interfaces/interface-user'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: {} as Record<string, User[]>, // keyed by page-gender
    currentPage: 1,
    genderFilter: '',
    sessionKey: '',
  }),

  actions: {
    setUsers(key: string, data: User[]) {
      this.users[key] = data
      localStorage.setItem(key, JSON.stringify(data))
    },

    getUsersFromStorage(key: string): User[] | null {
      const cached = localStorage.getItem(key)
      return cached ? JSON.parse(cached) : null
    },

    resetSession() {
      localStorage.clear()
      this.users = {}
      this.currentPage = 1
      this.sessionKey = `${Date.now()}`
    },

    setGenderFilter(gender: string) {
      this.genderFilter = gender
      this.currentPage = 1
    },
  },
})
