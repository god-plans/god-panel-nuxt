// API Services Index
// Export all services for easy importing

export { default as apiClient, ApiClient } from './api-client'
export { default as authService, AuthService } from './auth.service'
export { default as userService, UserService } from './user.service'
export { default as dashboardService, DashboardService } from './dashboard.service'
export { default as settingsService, SettingsService } from './settings.service'
export { BaseRepository, createRepository } from './repository'

// Import the services for the registry
import apiClient from './api-client'
import authService from './auth.service'
import userService from './user.service'
import dashboardService from './dashboard.service'
import settingsService from './settings.service'

// Service Registry - for easy access to all services
export const services = {
  api: apiClient,
  auth: authService,
  users: userService,
  dashboard: dashboardService,
  settings: settingsService,
} as const

// Type definitions for service registry
export type ServiceRegistry = typeof services

// Helper function to get a service by name
export function getService<K extends keyof ServiceRegistry>(name: K): ServiceRegistry[K] {
  return services[name]
}

// Helper function to get all services
export function getAllServices(): ServiceRegistry {
  return services
}

// Re-export commonly used types
export type { ApiResponse, User, Settings, DashboardStats } from '~/types'

// Re-export API constants for convenience
export { API_ENDPOINTS, HTTP_STATUS, ERROR_TYPES, CACHE_KEYS } from '~/constants/api'
