import type { Settings, ApiResponse } from '~/types'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '~/constants/api'

// Settings Service
export class SettingsService {
  // Get user settings
  async getUserSettings(): Promise<ApiResponse<Settings>> {
    return apiClient.get<Settings>(API_ENDPOINTS.SETTINGS.USER)
  }

  // Update user settings
  async updateUserSettings(settings: Partial<Settings>): Promise<ApiResponse<Settings>> {
    return apiClient.put<Settings>(API_ENDPOINTS.SETTINGS.USER, settings)
  }

  // Reset user settings to defaults
  async resetUserSettings(): Promise<ApiResponse<Settings>> {
    return apiClient.post<Settings>(`${API_ENDPOINTS.SETTINGS.USER}/reset`)
  }

  // Get system settings (admin only)
  async getSystemSettings(): Promise<ApiResponse<{
    maintenance: boolean
    registrationEnabled: boolean
    emailVerificationRequired: boolean
    maxFileSize: number
    allowedFileTypes: string[]
    rateLimits: {
      loginAttempts: number
      apiRequests: number
    }
  }>> {
    return apiClient.get(API_ENDPOINTS.SETTINGS.SYSTEM)
  }

  // Update system settings (admin only)
  async updateSystemSettings(settings: any): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.SETTINGS.SYSTEM, settings)
  }

  // Get user preferences
  async getPreferences(): Promise<ApiResponse<{
    language: string
    timezone: string
    dateFormat: string
    currency: string
    notifications: {
      email: boolean
      push: boolean
      sms: boolean
    }
  }>> {
    return apiClient.get(API_ENDPOINTS.SETTINGS.PREFERENCES)
  }

  // Update user preferences
  async updatePreferences(preferences: any): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.SETTINGS.PREFERENCES, preferences)
  }

  // Export user settings
  async exportSettings(): Promise<ApiResponse<{
    settings: Settings
    preferences: any
  }>> {
    return apiClient.get(`${API_ENDPOINTS.SETTINGS.USER}/export`)
  }

  // Import user settings
  async importSettings(settingsData: {
    settings: Partial<Settings>
    preferences: any
  }): Promise<ApiResponse<void>> {
    return apiClient.post(`${API_ENDPOINTS.SETTINGS.USER}/import`, settingsData)
  }

  // Backup user data
  async backupUserData(): Promise<ApiResponse<Blob>> {
    return apiClient.get(`${API_ENDPOINTS.SETTINGS.USER}/backup`, {
      responseType: 'blob'
    })
  }

  // Get theme presets
  async getThemePresets(): Promise<ApiResponse<Array<{
    id: string
    name: string
    settings: Partial<Settings>
    preview: {
      primary: string
      secondary: string
      background: string
    }
  }>>> {
    return apiClient.get(`${API_ENDPOINTS.SETTINGS.USER}/presets`)
  }

  // Apply theme preset
  async applyThemePreset(presetId: string): Promise<ApiResponse<Settings>> {
    return apiClient.post<Settings>(`${API_ENDPOINTS.SETTINGS.USER}/presets/${presetId}/apply`)
  }

  // Save custom theme preset
  async saveCustomPreset(name: string, settings: Partial<Settings>): Promise<ApiResponse<{
    id: string
    name: string
    settings: Settings
  }>> {
    return apiClient.post(`${API_ENDPOINTS.SETTINGS.USER}/presets`, {
      name,
      settings
    })
  }

  // Delete custom theme preset
  async deleteCustomPreset(presetId: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`${API_ENDPOINTS.SETTINGS.USER}/presets/${presetId}`)
  }

  // Get notification settings
  async getNotificationSettings(): Promise<ApiResponse<{
    email: {
      marketing: boolean
      security: boolean
      updates: boolean
      reminders: boolean
    }
    push: {
      messages: boolean
      notifications: boolean
      updates: boolean
    }
    frequency: 'immediate' | 'daily' | 'weekly' | 'never'
  }>> {
    return apiClient.get(`${API_ENDPOINTS.SETTINGS.PREFERENCES}/notifications`)
  }

  // Update notification settings
  async updateNotificationSettings(settings: any): Promise<ApiResponse<void>> {
    return apiClient.put(`${API_ENDPOINTS.SETTINGS.PREFERENCES}/notifications`, settings)
  }

  // Test notification settings
  async testNotifications(type: 'email' | 'push' | 'sms'): Promise<ApiResponse<void>> {
    return apiClient.post(`${API_ENDPOINTS.SETTINGS.PREFERENCES}/notifications/test`, { type })
  }

  // Get privacy settings
  async getPrivacySettings(): Promise<ApiResponse<{
    profileVisibility: 'public' | 'private' | 'friends'
    dataSharing: boolean
    analyticsTracking: boolean
    cookieConsent: boolean
  }>> {
    return apiClient.get(`${API_ENDPOINTS.SETTINGS.PREFERENCES}/privacy`)
  }

  // Update privacy settings
  async updatePrivacySettings(settings: any): Promise<ApiResponse<void>> {
    return apiClient.put(`${API_ENDPOINTS.SETTINGS.PREFERENCES}/privacy`, settings)
  }

  // Clear user data (GDPR compliance)
  async clearUserData(): Promise<ApiResponse<void>> {
    return apiClient.delete(`${API_ENDPOINTS.SETTINGS.USER}/data`)
  }

  // Get account deletion status
  async getAccountDeletionStatus(): Promise<ApiResponse<{
    requested: boolean
    scheduledDate?: string
    canCancel: boolean
  }>> {
    return apiClient.get(`${API_ENDPOINTS.SETTINGS.USER}/deletion`)
  }

  // Request account deletion
  async requestAccountDeletion(password: string): Promise<ApiResponse<{
    scheduledDate: string
    confirmationCode: string
  }>> {
    return apiClient.post(`${API_ENDPOINTS.SETTINGS.USER}/deletion`, { password })
  }

  // Cancel account deletion
  async cancelAccountDeletion(confirmationCode: string): Promise<ApiResponse<void>> {
    return apiClient.delete(`${API_ENDPOINTS.SETTINGS.USER}/deletion`, {
      data: { confirmationCode }
    })
  }

  // Cache management
  clearCache(): void {
    apiClient.clearCacheKey('settings:user')
    apiClient.clearCacheKey('settings:preferences')
    apiClient.clearCacheKey('settings:system')
  }
}

// Export singleton instance
export const settingsService = new SettingsService()
export default settingsService
