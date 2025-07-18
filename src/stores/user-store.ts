import { defineStore } from 'pinia'
import axios from 'axios'
import { FILTERS, type Filter, type User } from '@/interfaces/interface-user'
import type { UserStoreState } from '@/interfaces/interface-user-store'
import type { ApiResponse } from '@/interfaces/interface-api'

const API_URL = 'https://randomuser.me/api/'
const RESULTS_PER_PAGE = 10

const CACHE_KEY = 'userCache'

function generateSeed(): string {
  return Math.random().toString(36).substring(2)
}

export const useUserStore = defineStore('user', {
  state: (): UserStoreState => ({
    users: {},
    currentPage: 1,
    isLoading: false,
    error: null,
    selectedUser: null,
    activeFilter: FILTERS.ALL,
    sessionSeed: generateSeed(),
  }),

  getters: {
    currentUsers(state): User[] {
      // 1. Get the raw, unfiltered list for the current page
      const cacheKey = `${state.sessionSeed}-${state.currentPage}`
      const rawUsers = state.users[cacheKey] || []

      // 2. If the filter is 'all', return the whole list
      if (state.activeFilter === FILTERS.ALL) {
        return rawUsers
      }

      // 3. Otherwise, return the list filtered by gender
      return rawUsers.filter((user) => user.gender === state.activeFilter)
    },
  },

  actions: {
    async fetchUsers(page: number) {
      this.isLoading = true
      this.error = null
      const cacheKey = `${this.sessionSeed}-${page}`

      if (this.users[cacheKey]) {
        this.currentPage = page
        this.isLoading = false
        return
      }

      try {
        const cache = this.loadCache()
        if (cache[cacheKey]) {
          this.users[cacheKey] = cache[cacheKey]
          this.currentPage = page
          return
        }

        const response = await axios.get<ApiResponse>(
          `${API_URL}?page=${page}&results=${RESULTS_PER_PAGE}&seed=${this.sessionSeed}`,
        )

        const fetchedUsers: User[] = response.data.results
        this.users[cacheKey] = fetchedUsers
        this.currentPage = page

        // Save the newly fetched data to our cache
        cache[cacheKey] = fetchedUsers
        this.saveCache(cache)
      } catch (err: any) {
        this.error = err.message || 'Failed to fetch users'
      } finally {
        this.isLoading = false
      }
    },

    selectUser(user: User) {
      this.selectedUser = user
    },

    clearSelectedUser() {
      this.selectedUser = null
    },

    setFilter(filter: Filter) {
      this.activeFilter = filter
    },

    purgeAndResetSession() {
      this.sessionSeed = generateSeed()
      this.activeFilter = FILTERS.ALL
      this.users = {}
      this.currentPage = 1
      localStorage.removeItem(CACHE_KEY)
    },

    // in user-store.ts
    refresh() {
      // Directly reset the session and fetch instead of calling setFilter
      this.purgeAndResetSession()
      this.fetchUsers(1)
    },

    loadCache(): Record<string, User[]> {
      try {
        return JSON.parse(localStorage.getItem(CACHE_KEY) || '{}')
      } catch {
        return {}
      }
    },

    saveCache(data: Record<string, User[]>) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(data))
    },

    loadStateFromCache(): boolean {
      return false // Explicitly disabled
    },
  },
})
