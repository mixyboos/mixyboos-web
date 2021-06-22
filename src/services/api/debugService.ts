import apiClient from './apiClient'

const debugService = {
  getDebugInfo: async () => {
    const result = await apiClient.get('/debug')

    return result.data
  },
}

export { debugService }
