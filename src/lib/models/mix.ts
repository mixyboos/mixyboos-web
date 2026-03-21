import type { ProfileModel } from '@/lib/models/profile'

export type TagModel = {
  name: string
  slug: string
}

export type CreateMixModel = {
  id: string
  title: string
  description: string
  isProcessed: boolean
  user: ProfileModel
}
export type MixModel = CreateMixModel & {
  slug: string
  duration: number
  dateUploaded: string
  image: string
  likeCount: number
  playCount: number
  shareCount: number
  downloadCount: number
  audioUrl: string
  pcmUrl: string
  isLiked: boolean
  tags: Array<TagModel>
}
