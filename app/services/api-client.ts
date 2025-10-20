import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError, type InternalAxiosRequestConfig } from 'axios'
import type { ApiResponse } from '~/types'
import { config, apiConfig, requestConfig, errorConfig } from '~/config'
import { HTTP_STATUS, ERROR_TYPES, RETRY_CONFIG, HEADERS, STORAGE_KEYS } from '~/constants/api'

// Cache interface
interface CacheEntry {
  data: any
  timestamp: number
  ttl: number
}

// API Client class
export class ApiClient {
  private client: AxiosInstance
  private cache: Map<string, CacheEntry> = new Map()
  private requestQueue: Map<string, Promise<any>> = new Map()

  constructor() {
    this.client = axios.create({
      baseURL: apiConfig.baseURL,
      timeout: apiConfig.timeout,
      headers: {
        ...requestConfig.headers,
        [HEADERS.X_REQUESTED_WITH]: 'XMLHttpRequest',
      },
    })

    this.setupInterceptors()
  }

  // Setup request and response interceptors
  private setupInterceptors(): void {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => this.handleRequest(config),
      (error) => this.handleRequestError(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => this.handleResponse(response),
      (error) => this.handleResponseError(error)
    )
  }

  // Request interceptor handler
  private handleRequest(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    // Add authentication token
    if (process.client) {
      const token = this.getAuthToken()
      if (token) {
        config.headers = {
          ...config.headers,
          [HEADERS.AUTHORIZATION]: `Bearer ${token}`,
        } as any
      }
    }

    // Add timestamp for cache busting
    if (config.method?.toUpperCase() === 'GET') {
      config.params = {
        ...config.params,
        _t: Date.now(),
      }
    }

    // Log request in development
    if (apiConfig.enableLogging && process.dev) {
      console.log('🚀 API Request:', {
        method: config.method?.toUpperCase(),
        url: config.url,
        params: config.params,
        data: config.data,
      })
    }

    return config
  }

  // Request error handler
  private handleRequestError(error: AxiosError): Promise<AxiosError> {
    if (apiConfig.enableLogging && process.dev) {
      console.error('❌ Request Error:', error)
    }
    return Promise.reject(error)
  }

  // Response interceptor handler
  private handleResponse(response: AxiosResponse): AxiosResponse {
    // Log response in development
    if (apiConfig.enableLogging && process.dev) {
      console.log('✅ API Response:', {
        status: response.status,
        url: response.config.url,
        data: response.data,
      })
    }

    return response
  }

  // Response error handler with retry logic
  private async handleResponseError(error: AxiosError): Promise<any> {
    const config = error.config as AxiosRequestConfig & { _retry?: boolean; _retryCount?: number }

    if (!config) {
      return Promise.reject(error)
    }

    // Initialize retry count
    config._retryCount = config._retryCount || 0

    // Check if we should retry
    if (this.shouldRetry(error, config)) {
      config._retryCount += 1

      // Calculate delay with exponential backoff
      const delay = RETRY_CONFIG.RETRY_DELAY * Math.pow(RETRY_CONFIG.RETRY_MULTIPLIER, config._retryCount - 1)

      if (apiConfig.enableLogging && process.dev) {
        console.log(`🔄 Retrying request (${config._retryCount}/${RETRY_CONFIG.MAX_RETRIES}) in ${delay}ms`)
      }

      await this.delay(delay)
      return this.client.request(config)
    }

    // Handle specific error types
    const errorType = this.getErrorType(error)

    switch (errorType) {
      case ERROR_TYPES.UNAUTHORIZED:
        await this.handleUnauthorizedError()
        break
      case ERROR_TYPES.FORBIDDEN:
        this.handleForbiddenError()
        break
      default:
        break
    }

    // Transform error to standardized format
    const apiError = this.createApiError(error, errorType)

    if (apiConfig.enableLogging && process.dev) {
      console.error('❌ API Error:', apiError)
    }

    return Promise.reject(apiError)
  }

  // Check if request should be retried
  private shouldRetry(error: AxiosError, config: AxiosRequestConfig): boolean {
    // Don't retry if already retried max times
    if ((config as any)._retryCount >= RETRY_CONFIG.MAX_RETRIES) {
      return false
    }

    // Don't retry POST, PUT, PATCH, DELETE requests (idempotent)
    const method = config.method?.toUpperCase()
    if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(method || '')) {
      return false
    }

    // Retry only on specific status codes
    const status = error.response?.status
    return status ? (RETRY_CONFIG.RETRY_STATUS_CODES as readonly number[]).includes(status) : false
  }

  // Get error type from Axios error
  private getErrorType(error: AxiosError): string {
    if (!error.response) {
      return error.code === 'ECONNABORTED' ? ERROR_TYPES.TIMEOUT : ERROR_TYPES.NETWORK
    }

    switch (error.response.status) {
      case HTTP_STATUS.UNAUTHORIZED:
        return ERROR_TYPES.UNAUTHORIZED
      case HTTP_STATUS.FORBIDDEN:
        return ERROR_TYPES.FORBIDDEN
      case HTTP_STATUS.NOT_FOUND:
        return ERROR_TYPES.NOT_FOUND
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
      case HTTP_STATUS.BAD_GATEWAY:
      case HTTP_STATUS.SERVICE_UNAVAILABLE:
        return ERROR_TYPES.SERVER
      case HTTP_STATUS.BAD_REQUEST:
      case HTTP_STATUS.UNPROCESSABLE_ENTITY:
        return ERROR_TYPES.VALIDATION
      default:
        return ERROR_TYPES.UNKNOWN
    }
  }

  // Handle unauthorized error
  private async handleUnauthorizedError(): Promise<void> {
    if (process.client) {
      // Clear stored tokens
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN)
      localStorage.removeItem(STORAGE_KEYS.REFRESH_TOKEN)

      // Redirect to login if not already there
      const currentPath = window.location.pathname
      if (!currentPath.includes('/auth/login')) {
        await navigateTo('/auth/login')
      }
    }
  }

  // Handle forbidden error
  private handleForbiddenError(): void {
    // Could show a permission denied message or redirect
    console.warn('Access forbidden - insufficient permissions')
  }

  // Create standardized API error
  private createApiError(error: AxiosError, errorType: string): Error {
    let message = errorConfig.networkErrorMessage

    if (error.response?.data && typeof error.response.data === 'object' && 'message' in error.response.data) {
      message = (error.response.data as any).message
    } else if (error.message) {
      message = error.message
    } else {
      switch (errorType) {
        case ERROR_TYPES.TIMEOUT:
          message = errorConfig.timeoutErrorMessage
          break
        case ERROR_TYPES.UNAUTHORIZED:
          message = errorConfig.unauthorizedErrorMessage
          break
        case ERROR_TYPES.FORBIDDEN:
          message = errorConfig.forbiddenErrorMessage
          break
        case ERROR_TYPES.NOT_FOUND:
          message = errorConfig.notFoundErrorMessage
          break
        case ERROR_TYPES.SERVER:
          message = errorConfig.serverErrorMessage
          break
      }
    }

    const apiError = new Error(message)
    ;(apiError as any).type = errorType
    ;(apiError as any).status = error.response?.status
    ;(apiError as any).data = error.response?.data

    return apiError
  }

  // Get authentication token
  private getAuthToken(): string | null {
    if (process.client) {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)
    }
    return null
  }

  // Cache management
  private getCacheKey(config: AxiosRequestConfig): string {
    return `${config.method?.toUpperCase() || 'GET'}_${config.url || ''}_${JSON.stringify(config.params || {})}`
  }

  private getCacheEntry(key: string): any | null {
    const entry = this.cache.get(key)
    if (!entry) return null

    const now = Date.now()
    if (now - entry.timestamp > entry.ttl) {
      this.cache.delete(key)
      return null
    }

    return entry.data
  }

  private setCacheEntry(key: string, data: any, ttl: number = 5 * 60 * 1000): void {
    if (this.cache.size >= 100) { // Max cache size
      const firstKey = this.cache.keys().next().value
      if (firstKey) {
        this.cache.delete(firstKey)
      }
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
    })
  }

  // Request deduplication
  private getQueuedRequest(key: string): Promise<any> | null {
    return this.requestQueue.get(key) || null
  }

  private setQueuedRequest(key: string, promise: Promise<any>): void {
    this.requestQueue.set(key, promise)
    promise.finally(() => {
      this.requestQueue.delete(key)
    })
  }

  // Utility methods
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Public API methods
  public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'GET', url })
  }

  public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'POST', url, data })
  }

  public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PUT', url, data })
  }

  public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'PATCH', url, data })
  }

  public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    return this.request<T>({ ...config, method: 'DELETE', url })
  }

  public async request<T = any>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    const cacheKey = this.getCacheKey(config)
    const method = config.method?.toUpperCase()

    // Return cached data for GET requests
    if (method === 'GET' && !config.params?.noCache) {
      const cachedData = this.getCacheEntry(cacheKey)
      if (cachedData) {
        return cachedData
      }
    }

    // Check for queued request
    const queuedRequest = this.getQueuedRequest(cacheKey)
    if (queuedRequest) {
      return queuedRequest
    }

    // Make the request
    const promise = this.client.request(config).then(response => {
      const result: ApiResponse<T> = {
        success: true,
        data: response.data,
        message: response.data?.message,
      }

      // Cache GET responses
      if (method === 'GET') {
        this.setCacheEntry(cacheKey, result)
      }

      return result
    })

    // Queue the request
    this.setQueuedRequest(cacheKey, promise)

    return promise
  }

  // Cache management methods
  public clearCache(): void {
    this.cache.clear()
  }

  public clearCacheKey(key: string): void {
    this.cache.delete(key)
  }

  // Get the axios instance for advanced usage
  public getClient(): AxiosInstance {
    return this.client
  }
}

// Create and export singleton instance
export const apiClient = new ApiClient()

// Export the client instance as default
export default apiClient
