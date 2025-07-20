import type { User } from './interface-user'

export interface LocalStorageData {
  filter: 'all' | 'male' | 'female'
  page: number
  users: User[]
}
