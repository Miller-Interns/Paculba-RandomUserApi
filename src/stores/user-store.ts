import { defineStore } from 'pinia'
import type { User } from '@/interfaces/interface-user.ts' // Make sure this path points to your interfaces
import { FILTERS, type Filter } from '@/interfaces/interface-user.ts' // Make sure this path points to your interfaces

const BASE_CACHE_KEY = 'user_app_cache'

export const useUserStore = defineStore('user', {
  state: () => ({
    users: {} as Record<number, User[]>,
    currentPage: 1,
    activeFilter: FILTERS.ALL as Filter,
    isLoading: false,
    error: null as string | null,
    selectedUser: null as User | null,
  }),

  actions: {
    setUsers(page: number, users: User[]) {
      this.users = { ...this.users, [page]: users }
      console.log(`STORE: Cached users for page ${page} with filter "${this.activeFilter}".`)
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

    setFilter(newFilter: Filter) {
      if (this.activeFilter !== newFilter) {
        console.log(`STORE: Filter changed to "${newFilter}". Purging old data.`)
        this.purgeUsers()
        this.activeFilter = newFilter
        this.currentPage = 1
      }
    },

    purgeUsers() {
      this.users = {}
      this.error = null
    },

    selectUser(user: User) {
      console.log('STORE ACTION: selectUser called with', user.name.first)
      this.selectedUser = user
    },

    clearSelectedUser() {
      this.selectedUser = null
    },
  },
})
