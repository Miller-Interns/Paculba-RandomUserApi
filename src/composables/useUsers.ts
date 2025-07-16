import type { ApiResponse } from '@/interfaces/interface-api.ts'
import { useUserStore } from '@/stores/user-store.ts'

export const useUsers = () => {
  const store = useUserStore()
  const RESULTS_PER_PAGE = 10

  const fetchUsers = async (page: number) => {
    try {
      store.isLoading = true
      store.error = null
      
      // Skip if already cached
      if (store.users[page]) {
        store.setPage(page)
        return
      }

      const response = await fetch(`https://randomuser.me/api/?page=${page}&results=${RESULTS_PER_PAGE}&seed=abc123`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data: ApiResponse = await response.json()
      store.addUsers(page, data.results)
      store.setPage(page)
    } catch (err) {
      store.error = err instanceof Error ? err.message : 'Unknown error occurred'
    } finally {
      store.isLoading = false
    }
  }

  return {
    fetchUsers
  }
}