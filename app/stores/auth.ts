import { defineStore } from 'pinia'
import { userSchema, type User } from '~/types/validation'

const STORAGE_KEY = 'auth-token'

export const useAuthStore = defineStore('auth', () => {
  // State
  const user = ref<User | null>(null)
  const loading = ref(true)

  // Getters
  const isAuthenticated = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.role === 'admin')
  const isManager = computed(() => user.value?.role === 'manager')
  const userRole = computed(() => user.value?.role || 'user')
  const displayName = computed(() => user.value?.displayName || '')
  const userEmail = computed(() => user.value?.email || '')

  // Actions
  const initialize = async () => {
    loading.value = true
    try {
      if (process.client) {
        const token = localStorage.getItem(STORAGE_KEY)
        if (token) {
          // Verify token with API
          const { $axios } = useNuxtApp()
          const response = await $axios.get('/auth/me', {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          if (response.data?.user) {
            const validatedUser = userSchema.parse(response.data.user)
            user.value = { ...validatedUser, accessToken: token }
          }
        }
      }
    } catch (error) {
      console.error('Auth initialization failed:', error)
      logout()
    } finally {
      loading.value = false
    }
  }

  const login = async (credentials: { email: string; password: string }) => {
    try {
      const { $axios } = useNuxtApp()
      const response = await $axios.post('/auth/login', credentials)

      const { user: userData, accessToken } = response.data

      if (userData && accessToken) {
        const validatedUser = userSchema.parse(userData)
        user.value = { ...validatedUser, accessToken }

        if (process.client) {
          localStorage.setItem(STORAGE_KEY, accessToken)
        }

        // Token is automatically set by the axios plugin

        return { success: true }
      }
    } catch (error) {
      console.error('Login failed:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  }

  const register = async (userData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) => {
    try {
      const { $axios } = useNuxtApp()
      const response = await $axios.post('/auth/register', userData)

      const { user: newUser, accessToken } = response.data

      if (newUser && accessToken) {
        const validatedUser = userSchema.parse(newUser)
        user.value = { ...validatedUser, accessToken }

        if (process.client) {
          localStorage.setItem(STORAGE_KEY, accessToken)
        }

        // Token is automatically set by the axios plugin

        return { success: true }
      }
    } catch (error) {
      console.error('Registration failed:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      }
    }
  }

  const logout = () => {
    user.value = null
    if (process.client) {
      localStorage.removeItem(STORAGE_KEY)
    }
    // Token will be removed automatically when making requests
  }

  const updateProfile = async (updates: Partial<User>) => {
    try {
      const { $axios } = useNuxtApp()
      const response = await $axios.patch('/auth/profile', updates)

      if (response.data?.user) {
        const validatedUser = userSchema.parse(response.data.user)
        user.value = { ...user.value, ...validatedUser }
        return { success: true }
      }
    } catch (error) {
      console.error('Profile update failed:', error)
      return {
        success: false,
        error: error.response?.data?.message || 'Profile update failed'
      }
    }
  }

  // Initialize auth state
  if (process.client) {
    initialize()
  }

  return {
    // State
    user,
    loading,
    // Getters
    isAuthenticated,
    isAdmin,
    isManager,
    userRole,
    displayName,
    userEmail,
    // Actions
    initialize,
    login,
    register,
    logout,
    updateProfile
  }
})
