import axios from 'axios'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  // Create axios instance
  const instance = axios.create({
    baseURL: config.public.apiUrl,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      // Add auth token if available
      if (process.client) {
        const token = localStorage.getItem('auth-token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
      }

      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // Handle common errors
      if (error.response?.status === 401) {
        // Token expired or invalid
        if (process.client) {
          localStorage.removeItem('auth-token')
          // Redirect to login if not already there
          const router = useRouter()
          if (router.currentRoute.value.path !== '/auth/login') {
            router.push('/auth/login')
          }
        }
      }

      return Promise.reject(error)
    }
  )

  // Make axios available globally
  return {
    provide: {
      axios: instance
    }
  }
})
