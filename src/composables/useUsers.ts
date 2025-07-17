import { useUserStore } from '@/stores/user-store'

export function useUsers() {
  const store = useUserStore()

  const fetchUsers = async (page: number, options: { gender?: string } = {}) => {
    // If the data is already in the store (from a previous API call or session storage), we don't fetch it again.
    if (store.users[page]?.length) {
      store.setCurrentPage(page)
      console.log(`Getting users for page ${page} from cache.`)
      return
    }

    // 1. Prevent multiple fetches at the same time
    if (store.isLoading) return

    // 2. Set loading state and clear previous errors
    store.setLoading(true)
    store.setError(null)

    try {
      console.log(`Fetching users for page ${page} from API...`)

      const url = new URL('https://randomuser.me/api/')
      url.searchParams.append('page', String(page))
      url.searchParams.append('results', '10')
      url.searchParams.append('seed', 'abc') // Keeps the user list consistent
      if (options.gender && options.gender !== 'ALL') {
        url.searchParams.append('gender', options.gender.toLowerCase())
      }

      const response = await fetch(url.toString())
      if (!response.ok) throw new Error('Network response was not ok.')

      // 4. Fetch data from the API

      const data = await response.json()
      console.log('API Response Data:', data)
      store.setUsers(page, data.results)
      store.setCurrentPage(page)
    } catch (err: any) {
      console.error('Error in fetchUsers:', err)
      store.setError(err.message || 'An unknown error occurred while fetching users.')
    } finally {
      // 6. ALWAYS ensure loading is set to false when done
      store.setLoading(false)
    }
  }

  return { fetchUsers }
}
