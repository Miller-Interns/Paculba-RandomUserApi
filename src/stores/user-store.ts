// src/stores/user-store.ts

import { defineStore } from 'pinia'
import type { User } from '@/interfaces/interface-user.ts' // Make sure this path points to your interfaces

const USER_CACHE_KEY = 'random_user_app_cache'

// ✅ HELPER FUNCTION to safely get data from session storage.
function getCachedUsers(): Record<number, User[]> {
  const cachedData = sessionStorage.getItem(USER_CACHE_KEY)
  if (cachedData) {
    try {
      // Safely parse the data; if it's invalid, return an empty object.
      return JSON.parse(cachedData)
    } catch (e) {
      console.error('Failed to parse cached user data.', e)
      return {}
    }
  }
  return {}
}

export const useUserStore = defineStore('user', {
  state: () => ({
    // This structure maps a page number (key) to an array of users (value)
    users: {} as Record<number, User[]>,
    currentPage: 1,
    isLoading: false,
    error: null as string | null,
  }),
  actions: {
    setUsers(page: number, users: User[]) {
      // Use the spread operator to ensure reactivity
      console.log(`STORE: Setting ${users.length} users for page ${page}.`)
      this.users = { ...this.users, [page]: users }
    },
    setCurrentPage(page: number) {
      this.currentPage = page
    },
    setLoading(loading: boolean) {
      this.isLoading = loading
    },
    setError(error: string | null) {
      this.error = error
    },

    // ✅ NEW ACTION to purge the cache.
    purgeUsers() {
      console.log('PURGING USER CACHE...')
      this.users = {}
      this.currentPage = 1
      sessionStorage.removeItem(USER_CACHE_KEY)
    },
  },
})
