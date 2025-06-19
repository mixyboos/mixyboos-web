import { useMutation, useQuery } from '@tanstack/react-query'
import type { UseQueryResult } from '@tanstack/react-query'
import type { MixModel } from '@/lib/models/mix'
import {
  getByUserAndSlug,
  getMyMixes,
  toggleLike,
} from '@/lib/services/api/mix-service'
import logger from '@/lib/logger'

export const useGetMyMixesQuery = () => {
  return useQuery({
    queryKey: ['user-mixes'],
    queryFn: async () => {
      try {
        return await getMyMixes()
      } catch (err) {
        console.error(err)
        return Promise.reject(err)
      }
    },
  })
}

export const useMixByUserAndSlug = (
  userSlug: string,
  mixSlug: string,
): UseQueryResult<MixModel | undefined> => {
  return useQuery({
    queryKey: ['mix', userSlug, mixSlug],
    queryFn: () => getByUserAndSlug(userSlug, mixSlug),
    enabled: !!(userSlug && mixSlug), // Only run query if params exist
  })
}

export const useToggleMixLike = (mix: MixModel) => {
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await toggleLike(mix)
        return response
      } catch (err) {
        logger.error('tan-mix-service', 'toggle-mix-like', err)
      }
    },
  })
}
