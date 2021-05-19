import axios from 'axios'
import { store } from '~/store'

const api = axios.create({
	baseURL: 'http://localhost:8000/api',
	timeout: 15000
})

api.interceptors.request.use(async config => {
  const { auth } = store.getState()
	
  if (auth.token)
    config.headers.Authorization = `Bearer ${auth.token}`

  return config
})

export default api