import type { User, ApiResponse } from '~/types'
import { BaseRepository } from './repository'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '~/constants/api'

// User Repository extending BaseRepository
class UserRepository extends BaseRepository<User, Omit<User, 'id'>, Partial<User>> {
  constructor() {
    super(API_ENDPOINTS.USERS.LIST, 'users')
  }

  // Find users by role
  async findByRole(role: string): Promise<ApiResponse<User[]>> {
    return apiClient.get<User[]>(`${this.endpoint}/role/${role}`)
  }

  // Find users by email
  async findByEmail(email: string): Promise<ApiResponse<User>> {
    return apiClient.get<User>(`${this.endpoint}/email/${email}`)
  }

  // Get user permissions
  async getPermissions(userId: string): Promise<ApiResponse<string[]>> {
    return apiClient.get<string[]>(API_ENDPOINTS.USERS.PERMISSIONS(userId))
  }

  // Update user permissions
  async updatePermissions(userId: string, permissions: string[]): Promise<ApiResponse<void>> {
    return apiClient.put(API_ENDPOINTS.USERS.PERMISSIONS(userId), { permissions })
  }

  // Get user profile (different from auth profile)
  async getProfile(userId: string): Promise<ApiResponse<User>> {
    return apiClient.get<User>(API_ENDPOINTS.USERS.PROFILE(userId))
  }

  // Update user profile
  async updateProfile(userId: string, profileData: Partial<User>): Promise<ApiResponse<User>> {
    return apiClient.put(API_ENDPOINTS.USERS.PROFILE(userId), profileData)
  }

  // Toggle user active status
  async toggleActive(userId: string): Promise<ApiResponse<User>> {
    return apiClient.patch<User>(`${this.endpoint}/${userId}/toggle-active`)
  }

  // Bulk activate users
  async bulkActivate(userIds: string[]): Promise<ApiResponse<User[]>> {
    return apiClient.patch<User[]>(`${this.endpoint}/bulk/activate`, { userIds })
  }

  // Bulk deactivate users
  async bulkDeactivate(userIds: string[]): Promise<ApiResponse<User[]>> {
    return apiClient.patch<User[]>(`${this.endpoint}/bulk/deactivate`, { userIds })
  }

  // Get user statistics
  async getStatistics(): Promise<ApiResponse<{
    totalUsers: number
    activeUsers: number
    inactiveUsers: number
    usersByRole: Record<string, number>
  }>> {
    return apiClient.get(`${this.endpoint}/statistics`)
  }

  // Export users
  async exportUsers(format: 'csv' | 'excel' = 'csv'): Promise<ApiResponse<Blob>> {
    return apiClient.get(`${this.endpoint}/export`, {
      params: { format },
      responseType: 'blob'
    })
  }

  // Import users
  async importUsers(file: File): Promise<ApiResponse<{ imported: number; failed: number; errors: string[] }>> {
    const formData = new FormData()
    formData.append('file', file)

    return apiClient.post(`${this.endpoint}/import`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // Search users with advanced filters
  async searchAdvanced(filters: {
    query?: string
    role?: string
    isActive?: boolean
    createdAfter?: string
    createdBefore?: string
  }, page: number = 1, limit: number = 10): Promise<ApiResponse<{
    items: User[]
    total: number
    page: number
    limit: number
    totalPages: number
  }>> {
    return apiClient.get(`${this.endpoint}/search/advanced`, {
      params: { ...filters, page, limit }
    })
  }
}

// User Service class
export class UserService {
  private repository: UserRepository

  constructor() {
    this.repository = new UserRepository()
  }

  // Repository methods
  async findAll(params?: Record<string, any>): Promise<ApiResponse<User[]>> {
    return this.repository.findAll(params)
  }

  async findById(id: string): Promise<ApiResponse<User>> {
    return this.repository.findById(id)
  }

  async create(data: Omit<User, 'id'>): Promise<ApiResponse<User>> {
    return this.repository.create(data)
  }

  async update(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    return this.repository.update(id, data)
  }

  async delete(id: string): Promise<ApiResponse<void>> {
    return this.repository.delete(id)
  }

  async findPaginated(page: number = 1, limit: number = 10, params?: Record<string, any>) {
    return this.repository.findPaginated(page, limit, params)
  }

  // Specialized methods
  async findByRole(role: string): Promise<ApiResponse<User[]>> {
    return this.repository.findByRole(role)
  }

  async findByEmail(email: string): Promise<ApiResponse<User>> {
    return this.repository.findByEmail(email)
  }

  async getPermissions(userId: string): Promise<ApiResponse<string[]>> {
    return this.repository.getPermissions(userId)
  }

  async updatePermissions(userId: string, permissions: string[]): Promise<ApiResponse<void>> {
    return this.repository.updatePermissions(userId, permissions)
  }

  async getProfile(userId: string): Promise<ApiResponse<User>> {
    return this.repository.getProfile(userId)
  }

  async updateProfile(userId: string, profileData: Partial<User>): Promise<ApiResponse<User>> {
    return this.repository.updateProfile(userId, profileData)
  }

  async toggleActive(userId: string): Promise<ApiResponse<User>> {
    return this.repository.toggleActive(userId)
  }

  async bulkActivate(userIds: string[]): Promise<ApiResponse<User[]>> {
    return this.repository.bulkActivate(userIds)
  }

  async bulkDeactivate(userIds: string[]): Promise<ApiResponse<User[]>> {
    return this.repository.bulkDeactivate(userIds)
  }

  async getStatistics() {
    return this.repository.getStatistics()
  }

  async exportUsers(format: 'csv' | 'excel' = 'csv'): Promise<ApiResponse<Blob>> {
    return this.repository.exportUsers(format)
  }

  async importUsers(file: File) {
    return this.repository.importUsers(file)
  }

  async searchAdvanced(filters: {
    query?: string
    role?: string
    isActive?: boolean
    createdAfter?: string
    createdBefore?: string
  }, page: number = 1, limit: number = 10) {
    return this.repository.searchAdvanced(filters, page, limit)
  }

  // Utility methods
  async exists(email: string): Promise<boolean> {
    try {
      await this.findByEmail(email)
      return true
    } catch {
      return false
    }
  }

  async getUserCount(): Promise<number> {
    try {
      const stats = await this.getStatistics()
      return stats.success ? stats.data.totalUsers : 0
    } catch {
      return 0
    }
  }
}

// Export singleton instance
export const userService = new UserService()
export default userService
