import { StatusCodes } from 'http-status-codes'
import logger from '@/lib/logger'
import api from '@/lib/services/api/api-client'

const requeProcessMixJob = async (mixId: string): Promise<boolean> => {
  try {
    const result = await api.post(`job/requeuemix?mixId=${mixId}`)

    return result.status === StatusCodes.ACCEPTED
  } catch (err) {
    logger.errorLog('Unable to resubmit mix for processing', err)
  }
  return false
}

export { requeProcessMixJob }
