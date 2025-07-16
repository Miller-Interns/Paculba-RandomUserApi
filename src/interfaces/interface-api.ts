import type{ User} from './interface-user.ts'

export interface ApiResponse {
  results: User[]
  info: {
    seed: string
    results: number
    page: number
    version: string
  }
}