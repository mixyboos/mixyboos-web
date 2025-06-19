import type { User } from '@/lib/models/user'

export type ProfileModel = {
  slug: string
  title: string | null
  displayName: string | null
  biography: string | null
  profileImage: string
  headerImage: string
  urls: Array<string> | null
} & User
