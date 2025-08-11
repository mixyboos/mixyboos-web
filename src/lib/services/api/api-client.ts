import axios from 'axios'
import { env } from '@/env'

console.log('api-client', 'Creating api endpoint', env.NEXT_PUBLIC_API_URL)
const api = axios.create({
  withCredentials: true,
  baseURL: env.NEXT_PUBLIC_API_URL,
})

api.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (error.response?.status === 401) {
      window.location.href = '/login'
    }
    return Promise.reject(error)
  },
)

export default api
