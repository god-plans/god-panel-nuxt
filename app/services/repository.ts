import type { ApiResponse } from '~/types'
import { apiClient } from './api-client'

// Base Repository class implementing Repository pattern
export abstract class BaseRepository<T, TCreate = Partial<T>, TUpdate = Partial<T>> {
  protected endpoint: string
  protected cachePrefix: string

  constructor(endpoint: string, cachePrefix?: string) {
    this.endpoint = endpoint
    this.cachePrefix = cachePrefix || endpoint.replace('/', ':')
  }

  // Get all items
  async findAll(params?: Record<string, any>): Promise<ApiResponse<T[]>> {
    const cacheKey = `${this.cachePrefix}:list`
    return apiClient.get<T[]>(this.endpoint, {
      params,
      headers: { 'Cache-Key': cacheKey }
    })
  }

  // Get item by ID
  async findById(id: string | number): Promise<ApiResponse<T>> {
    const cacheKey = `${this.cachePrefix}:${id}`
    return apiClient.get<T>(`${this.endpoint}/${id}`, {
      headers: { 'Cache-Key': cacheKey }
    })
  }

  // Create new item
  async create(data: TCreate): Promise<ApiResponse<T>> {
    const result = await apiClient.post<T>(this.endpoint, data)
    // Clear list cache after creation
    this.clearCache(`${this.cachePrefix}:list`)
    return result
  }

  // Update item
  async update(id: string | number, data: TUpdate): Promise<ApiResponse<T>> {
    const result = await apiClient.put<T>(`${this.endpoint}/${id}`, data)
    // Clear both item and list cache
    this.clearCache(`${this.cachePrefix}:${id}`)
    this.clearCache(`${this.cachePrefix}:list`)
    return result
  }

  // Partial update item
  async patch(id: string | number, data: Partial<TUpdate>): Promise<ApiResponse<T>> {
    const result = await apiClient.patch<T>(`${this.endpoint}/${id}`, data)
    // Clear both item and list cache
    this.clearCache(`${this.cachePrefix}:${id}`)
    this.clearCache(`${this.cachePrefix}:list`)
    return result
  }

  // Delete item
  async delete(id: string | number): Promise<ApiResponse<void>> {
    const result = await apiClient.delete<void>(`${this.endpoint}/${id}`)
    // Clear both item and list cache
    this.clearCache(`${this.cachePrefix}:${id}`)
    this.clearCache(`${this.cachePrefix}:list`)
    return result
  }

  // Search items
  async search(query: string, params?: Record<string, any>): Promise<ApiResponse<T[]>> {
    return apiClient.get<T[]>(`${this.endpoint}/search`, {
      params: { q: query, ...params }
    })
  }

  // Get items with pagination
  async findPaginated(page: number = 1, limit: number = 10, params?: Record<string, any>): Promise<ApiResponse<{
    items: T[]
    total: number
    page: number
    limit: number
    totalPages: number
  }>> {
    const cacheKey = `${this.cachePrefix}:paginated:${page}:${limit}:${JSON.stringify(params || {})}`
    return apiClient.get(`${this.endpoint}/paginated`, {
      params: { page, limit, ...params },
      headers: { 'Cache-Key': cacheKey }
    })
  }

  // Bulk operations
  async bulkCreate(items: TCreate[]): Promise<ApiResponse<T[]>> {
    const result = await apiClient.post<T[]>(`${this.endpoint}/bulk`, { items })
    this.clearCache(`${this.cachePrefix}:list`)
    return result
  }

  async bulkUpdate(updates: Array<{ id: string | number; data: TUpdate }>): Promise<ApiResponse<T[]>> {
    const result = await apiClient.put<T[]>(`${this.endpoint}/bulk`, { updates })
    // Clear all caches
    this.clearCache()
    return result
  }

  async bulkDelete(ids: Array<string | number>): Promise<ApiResponse<void>> {
    const result = await apiClient.delete<void>(`${this.endpoint}/bulk`, {
      data: { ids }
    })
    this.clearCache()
    return result
  }

  // Cache management
  protected clearCache(key?: string): void {
    if (key) {
      apiClient.clearCacheKey(key)
    } else {
      // Clear all cache entries for this repository
      apiClient.clearCache()
    }
  }

  // Custom query methods (to be implemented by subclasses)
  async findByField?(field: string, value: any): Promise<ApiResponse<T[]>>
  async count?(params?: Record<string, any>): Promise<ApiResponse<number>>
  async exists?(id: string | number): Promise<ApiResponse<boolean>>
}

// Repository factory function
export function createRepository<T, TCreate = Partial<T>, TUpdate = Partial<T>>(
  endpoint: string,
  cachePrefix?: string
): BaseRepository<T, TCreate, TUpdate> {
  return new (class extends BaseRepository<T, TCreate, TUpdate> {
    constructor() {
      super(endpoint, cachePrefix)
    }
  })()
}
