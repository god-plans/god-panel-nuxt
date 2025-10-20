import { apiClient } from '~/services'

export default defineNuxtPlugin(() => {
  // Provide the API client globally for backward compatibility
  // New code should use the services directly
  return {
    provide: {
      axios: apiClient.getClient(), // Provide axios instance for backward compatibility
      apiClient: apiClient, // Provide the new API client
      services: {
        auth: () => import('~/services/auth.service').then(m => m.authService),
        users: () => import('~/services/user.service').then(m => m.userService),
        dashboard: () => import('~/services/dashboard.service').then(m => m.dashboardService),
        settings: () => import('~/services/settings.service').then(m => m.settingsService),
      }
    }
  }
})
