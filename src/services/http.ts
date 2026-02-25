import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
})

http.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Bir hata oluştu'
    return Promise.reject(new Error(message))
  }
)
