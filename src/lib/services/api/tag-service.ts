import { AxiosError } from 'axios'
import type { TagModel } from '@/lib/models/tag'
import api from '@/lib/services/api/api-client'
import logger from '@/lib/logger'

const TagService = {
  searchTags: async (query: string): Promise<Array<TagModel>> => {
    try {
      const result = await api.get(`/tag/search?query=${encodeURIComponent(query)}`)
      if (result.status === 200) {
        return result.data
      }
      if (result.status === 204) {
        return []
      }
    } catch (err) {
      logger.error('tag-service', 'searchTags_error', err)
      if (err instanceof AxiosError) {
        if (![401, 400].includes(err.status as number)) {
          throw new Error(err.message)
        }
      }
    }
    return []
  },
}

export default TagService
