import type { User } from './interface-user'
import type { Filter } from './interface-user'

export interface UserStoreState {
  users: Record<string, User[]>
  currentPage: number
  isLoading: boolean
  error: string | null
  selectedUser: User | null
  activeFilter: Filter
  sessionSeed: string
}
