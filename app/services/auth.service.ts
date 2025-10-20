import type { User, LoginForm, RegisterForm, ApiResponse } from '~/types'
import { apiClient } from './api-client'
import { API_ENDPOINTS, STORAGE_KEYS } from '~/constants/api'

// Authentication Service
export class AuthService {
  // Login user
  async login(credentials: LoginForm): Promise<ApiResponse<{ user: User; accessToken: string; refreshToken: string }>> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.LOGIN, credentials)

    if (response.success && response.data) {
      // Store tokens in localStorage
      this.setTokens(response.data.accessToken, response.data.refreshToken)
      // Store user data
      this.setUser(response.data.user)
    }

    return response
  }

  // Register new user
  async register(userData: RegisterForm): Promise<ApiResponse<{ user: User; accessToken: string; refreshToken: string }>> {
    const response = await apiClient.post(API_ENDPOINTS.AUTH.REGISTER, userData)

    if (response.success && response.data) {
      // Store tokens in localStorage
      this.setTokens(response.data.accessToken, response.data.refreshToken)
      // Store user data
      this.setUser(response.data.user)
    }

    return response
  }

  // Logout user
  async logout(): Promise<ApiResponse<void>> {
    try {
      await apiClient.post(API_ENDPOINTS.AUTH.LOGOUT)
    } catch (error) {
      // Continue with logout even if API call fails
      console.warn('Logout API call failed:', error)
    }

    // Clear stored data
    this.clearStoredData()

    return {
      success: true,
      data: undefined,
      message: 'Logged out successfully'
    }
  }

  // Get current user profile
  async getProfile(): Promise<ApiResponse<User>> {
    const response = await apiClient.get<User>(API_ENDPOINTS.AUTH.PROFILE)

    if (response.success && response.data) {
      this.setUser(response.data)
    }

    return response
  }

  // Update user profile
  async updateProfile(profileData: Partial<User>): Promise<ApiResponse<User>> {
    const response = await apiClient.put<User>(API_ENDPOINTS.AUTH.PROFILE, profileData)

    if (response.success && response.data) {
      this.setUser(response.data)
    }

    return response
  }

  // Refresh access token
  async refreshToken(): Promise<ApiResponse<{ accessToken: string }>> {
    const refreshToken = this.getRefreshToken()

    if (!refreshToken) {
      throw new Error('No refresh token available')
    }

    const response = await apiClient.post(API_ENDPOINTS.AUTH.REFRESH, {
      refreshToken
    })

    if (response.success && response.data?.accessToken) {
      this.setAccessToken(response.data.accessToken)
    }

    return response
  }

  // Verify email
  async verifyEmail(token: string): Promise<ApiResponse<void>> {
    return apiClient.post(API_ENDPOINTS.AUTH.VERIFY_EMAIL, { token })
  }

  // Forgot password
  async forgotPassword(email: string): Promise<ApiResponse<void>> {
    return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email })
  }

  // Reset password
  async resetPassword(token: string, newPassword: string): Promise<ApiResponse<void>> {
    return apiClient.post(API_ENDPOINTS.AUTH.RESET_PASSWORD, {
      token,
      password: newPassword
    })
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    if (!process.client) return false

    const token = this.getAccessToken()
    if (!token) return false

    // Check if token is expired (basic check)
    try {
      const payload = JSON.parse(atob(token.split('.')[1] || ''))
      const currentTime = Date.now() / 1000
      return payload.exp && payload.exp > currentTime
    } catch {
      return false
    }
  }

  // Get stored user
  getStoredUser(): User | null {
    if (!process.client) return null

    try {
      const userData = localStorage.getItem('user')
      return userData ? JSON.parse(userData) : null
    } catch {
      return null
    }
  }

  // Token management
  private getAccessToken(): string | null {
    if (!process.client) return null
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
  }

  private getRefreshToken(): string | null {
    if (!process.client) return null
    return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN)
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (!process.client) return

    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken)
    localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, refreshToken)
  }

  private setAccessToken(accessToken: string): void {
    if (!process.client) return
    localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, accessToken)
  }

  private setUser(user: User): void {
    if (!process.client) return
    localStorage.setItem('user', JSON.stringify(user))
  }

  private clearStoredData(): void {
    if (!process.client) return

    localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
    localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)
    localStorage.removeItem('user')
  }

  // Initialize auth state (call on app start)
  async initializeAuth(): Promise<User | null> {
    if (!this.isAuthenticated()) {
      this.clearStoredData()
      return null
    }

    // Try to get fresh user data
    try {
      const response = await this.getProfile()
      return response.success ? response.data : null
    } catch {
      // If profile fetch fails, try to refresh token
      try {
        await this.refreshToken()
        const response = await this.getProfile()
        return response.success ? response.data : null
      } catch {
        // If everything fails, clear data
        this.clearStoredData()
        return null
      }
    }
  }
}

// Export singleton instance
export const authService = new AuthService()
export default authService
