import axios from 'axios'
import AuthTokenModel from '../../data/models/AuthTokenModel'
const TKKEY = '__tks'

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL as string,
})

const _getTokens = async (): Promise<AuthTokenModel | null> => {
  const value = await localStorage.getItem(TKKEY)
  if (value) {
    const keys: AuthTokenModel = JSON.parse(value)
    return keys
  }
  return null
}

// Request interceptor for API calls
apiClient.interceptors.request.use(
  async (config) => {
    const keys = await _getTokens()
    if (keys) {
      config.headers = {
        Authorization: `Bearer ${keys.access_token}`,
        Accept: 'application/json'
      }
    }
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)
//token refresher
apiClient.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    const originalRequest = error.config
    let tokens = await _getTokens()

    if (
      tokens &&
      tokens.refresh_token &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      //   const refreshUrl = `${process.env.NEXT_PUBLIC_API_URL}/connect/token`
      const refreshUrl = process.env.NEXT_PUBLIC_API_URL + "/connect/token";
      const params = new URLSearchParams();
      params.append(
        "grant_type",
        process.env.NEXT_PUBLIC_AUTH_REFRESH_GRANT_TYPE as string
      );
      params.append("client_id", process.env.NEXT_PUBLIC_AUTH_CLIENT_ID as string);
      params.append("refresh_token", tokens.refresh_token);
      const headers = {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      };
      //use axios here so bearer token isn't sent
      return axios.post(refreshUrl, params).then(
        (res) => {
          if (res.status === 200) {
            localStorage.setItem(TKKEY, JSON.stringify(res.data));
            console.log("Access token refreshed!");
            return apiClient(originalRequest);
          }
        },
        (err) => {
          console.log("apiClient", "Error refreshing token", err);
          localStorage.removeItem(TKKEY);
        }
      );
    }
    localStorage.removeItem(TKKEY)
    return Promise.reject(error)
  }
)

export { TKKEY }
export default apiClient
