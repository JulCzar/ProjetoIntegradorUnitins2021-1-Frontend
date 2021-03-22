import axios from 'axios'

const api = axios.create({
	baseURL: process.env.BASE_URL_API,
	timeout: 5000
})

export default api