import type { ProfileModel } from '@/lib/models/profile'
import type { ShowStatus } from '@/lib/models/show-status'

export class LiveShowModel {
  constructor(
    title: string,
    description: string,
    tags: Array<string>,
    startDate: Date,
    status: ShowStatus,
  ) {
    this.title = title
    this.description = description
    this.tags = tags
    this.startDate = startDate
    this.status = status
  }
  id?: string
  title: string
  description: string
  tags: Array<string>

  startDate: Date
  status: ShowStatus

  user: ProfileModel | undefined
  fromJson = (model: string) => {
    console.log('live-show', 'fromJson', model)
  }
}
