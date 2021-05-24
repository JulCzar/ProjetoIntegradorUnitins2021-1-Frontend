import axios from 'axios'
import { store } from '~/store'
import { BASE_URL } from '~/config/HTTP'

const api = axios.create({
	baseURL: BASE_URL,
	timeout: 15000
})

api.interceptors.request.use(async config => {
  const { auth } = store.getState()
	
  if (auth.token)
    config.headers.Authorization = `Bearer ${auth.token}`

  return config
})

export default api