import { ref, readonly, type Ref, onMounted } from 'vue'
import type { ApiResponse } from '~/types'
import { apiClient } from '~/services'

// Generic API composable for reactive API calls
export function useApi<T = any>() {
  const data: Ref<T | null> = ref(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const execute = async <R = any>(
    apiCall: () => Promise<ApiResponse<R>>,
    options: {
      onSuccess?: (result: R) => void
      onError?: (error: string) => void
      immediate?: boolean
    } = {}
  ): Promise<ApiResponse<R>> => {
    loading.value = true
    error.value = null

    try {
      const response = await apiCall()

      if (response.success) {
        data.value = response.data as unknown as T
        options.onSuccess?.(response.data)
      } else {
        error.value = response.message || 'An error occurred'
        options.onError?.(error.value)
      }

      return response
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred'
      error.value = errorMessage
      options.onError?.(errorMessage)
      throw err
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    data.value = null
    loading.value = false
    error.value = null
  }

  return {
    data: readonly(data),
    loading: readonly(loading),
    error: readonly(error),
    execute,
    reset
  }
}

// Authentication composable
export function useAuth() {
  const { $services } = useNuxtApp()

  const login = async (credentials: { email: string; password: string }) => {
    const authService = await $services.auth()
    return authService.login(credentials)
  }

  const logout = async () => {
    const authService = await $services.auth()
    return authService.logout()
  }

  const refreshToken = async () => {
    const authService = await $services.auth()
    return authService.refreshToken()
  }

  const getProfile = async () => {
    const authService = await $services.auth()
    return authService.getProfile()
  }

  const isAuthenticated = () => {
    if (process.client) {
      const authService = $services.auth()
      return authService.then(service => service.isAuthenticated())
    }
    return false
  }

  return {
    login,
    logout,
    refreshToken,
    getProfile,
    isAuthenticated
  }
}

// Users composable
export function useUsers() {
  const { $services } = useNuxtApp()

  const getUsers = async (params?: Record<string, any>) => {
    const userService = await $services.users()
    return userService.findAll(params)
  }

  const getUser = async (id: string) => {
    const userService = await $services.users()
    return userService.findById(id)
  }

  const createUser = async (userData: any) => {
    const userService = await $services.users()
    return userService.create(userData)
  }

  const updateUser = async (id: string, userData: any) => {
    const userService = await $services.users()
    return userService.update(id, userData)
  }

  const deleteUser = async (id: string) => {
    const userService = await $services.users()
    return userService.delete(id)
  }

  return {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
  }
}

// Dashboard composable
export function useDashboard() {
  const { $services } = useNuxtApp()

  const getStats = async () => {
    const dashboardService = await $services.dashboard()
    return dashboardService.getStats()
  }

  const getOverview = async () => {
    const dashboardService = await $services.dashboard()
    return dashboardService.getOverview()
  }

  const getAnalytics = async (params?: any) => {
    const dashboardService = await $services.dashboard()
    return dashboardService.getAnalytics(params)
  }

  const refreshData = async () => {
    const dashboardService = await $services.dashboard()
    return dashboardService.refreshData()
  }

  return {
    getStats,
    getOverview,
    getAnalytics,
    refreshData
  }
}

// Settings composable
export function useSettings() {
  const { $services } = useNuxtApp()

  const getUserSettings = async () => {
    const settingsService = await $services.settings()
    return settingsService.getUserSettings()
  }

  const updateUserSettings = async (settings: any) => {
    const settingsService = await $services.settings()
    return settingsService.updateUserSettings(settings)
  }

  const getPreferences = async () => {
    const settingsService = await $services.settings()
    return settingsService.getPreferences()
  }

  const updatePreferences = async (preferences: any) => {
    const settingsService = await $services.settings()
    return settingsService.updatePreferences(preferences)
  }

  return {
    getUserSettings,
    updateUserSettings,
    getPreferences,
    updatePreferences
  }
}

// Generic data fetching composable with caching
export function useApiData<T = any>(
  fetcher: () => Promise<ApiResponse<T>>,
  options: {
    immediate?: boolean
    errorHandler?: (error: string) => void
  } = {}
) {
  const { data, loading, error, execute, reset } = useApi<T>()

  const refetch = () => execute(fetcher, { onError: options.errorHandler })

  // Auto-fetch on mount if immediate is true
  if (options.immediate) {
    onMounted(() => {
      refetch()
    })
  }

  return {
    data,
    loading,
    error,
    refetch,
    reset,
    execute: (opts?: any) => execute(fetcher, { ...opts, onError: options.errorHandler })
  }
}
