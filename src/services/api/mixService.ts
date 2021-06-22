import MixModel from '../../data/models/MixModel'
import apiClient from './apiClient'

const mixService = {
  getMixes: async (): Promise<Array<MixModel>> => {
    try {
      const result = await apiClient.get('/mix')
      if (result.status === 200) {
        return result.data
      }
    } catch (err) {
      console.log('authService', 'getMixes_error', err)
      if (![401, 400].includes(err.response.status)) throw new Error(err)
    }
    throw new Error('Unable to load mixes')
  },
  createMix: async (mix: MixModel): Promise<MixModel> => {
    try {
      const result = await apiClient.post('/mix', mix)
      if (result.status === 201) {
        return result.data
      }
    } catch (err) {
      console.log('authService', 'getUser_error', err)
      if (err.response.status !== 401) throw new Error(err)
    }
    throw new Error('Unable to create mix')
  },
}

export default mixService
