import { ref } from 'vue'
import axios from 'axios'
import type { User } from '@/interfaces/interface-user'
import type { ApiResponse } from '@/interfaces/interface-api'

export function useUserFetch() {
  const users = ref<User[]>([])
  const isLoading = ref(false)

  async function fetchUsers(page = 1, gender?: string, results = 10) {
    isLoading.value = true
    try {
      const url = `https://randomuser.me/api/?page=${page}&results=${results}${gender ? `&gender=${gender}` : ''}`
      const response = await axios.get<ApiResponse>(url)
      users.value = response.data.results
      localStorage.setItem(
        `users-page-${page}${gender ? `-${gender}` : ''}`,
        JSON.stringify(users.value),
      )
    } finally {
      isLoading.value = false
    }
  }

  return { users, fetchUsers, isLoading }
}
