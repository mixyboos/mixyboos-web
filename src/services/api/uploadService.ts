import apiClient from './apiClient'

const uploadService = {
  uploadAudio: async (
    id: string,
    formData: FormData,
    callback: (total: number, loaded: number) => void
  ): Promise<string> => {
    try {
      const result = await apiClient.post(`/upload`, formData, {
        onUploadProgress: (e) => {
          console.log('Upload', 'progress', e)
          callback(e.total, e.loaded)
        },
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      if (result.status === 201) {
        return result.data
      }
    } catch (err) {
      console.log('authService', 'getUser_error', err)
      if (err.response.status !== 401) throw new Error(err)
    }
    throw new Error('Unable to load mixes')
  },
}

export default uploadService
