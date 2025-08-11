import type { User } from '@/lib/models/user'

export type ProfileModel = {
  title: string | null
  biography: string | null
  profileImage: string
  headerImage: string
  urls: Array<string> | null
} & User
