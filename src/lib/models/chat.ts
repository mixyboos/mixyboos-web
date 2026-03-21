import type { ProfileModel } from '@/lib/models/profile'

export type ChatModel = {
  id: string
  fromUser: ProfileModel
  toUser: ProfileModel
  timestamp: Date
  message: string
}
