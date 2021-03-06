import { ApiKeyModel, ShowModel } from "../../data/models";
import apiClient from "./apiClient";

const liveService = {
  getStreamKey: async (): Promise<string> => {
    const keyDetails = await apiClient.get<ApiKeyModel>('/profile/apikey')
    return keyDetails.data.apiKey
  },

  getCurrentShow: async (): Promise<ShowModel> => {
    const result = await apiClient.get<ShowModel>('/live/current')
    return result.status === 200 ? result.data : null
  },

  getShowInProgress: async (user: string): Promise<ShowModel> => {
    const result = await apiClient.get<ShowModel>(`/live/current/${user}`)
    return result.status === 200 ? result.data : null
  },

  startShow: async (title: string): Promise<boolean> => {
    const result = await apiClient.post('/live/start', {
      title,
    })

    return result.status === 201
  },
}

export default liveService;
