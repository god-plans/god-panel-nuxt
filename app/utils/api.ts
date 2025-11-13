import type { ApiResponse } from '~/types'

export const apiEndpoints = {
  auth: {
    login: '/auth/login',
  },
  users: {
    list: '/users',
    create: '/users',
    update: (id: string) => `/users/${id}`,
    delete: (id: string) => `/users/${id}`
  },
  dashboard: {
    stats: '/dashboard/stats',
    overview: '/dashboard/overview'
  }
}

export const handleApiError = (error: any): string => {
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return 'An unexpected error occurred'
}

export const createApiResponse = <T>(
  success: boolean,
  data?: T,
  message?: string
): ApiResponse<T> => ({
  success,
  data: data as T,
  message
})
