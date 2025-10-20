import type { DashboardStats, ApiResponse } from '~/types'
import { apiClient } from './api-client'
import { API_ENDPOINTS } from '~/constants/api'

// Dashboard Service
export class DashboardService {
  // Get dashboard statistics
  async getStats(): Promise<ApiResponse<DashboardStats>> {
    return apiClient.get<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS)
  }

  // Get dashboard overview
  async getOverview(): Promise<ApiResponse<{
    stats: DashboardStats
    recentActivity: Array<{
      id: string
      type: string
      message: string
      timestamp: string
      user?: string
    }>
    quickStats: Array<{
      label: string
      value: number | string
      change?: number
      trend?: 'up' | 'down' | 'stable'
    }>
  }>> {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.OVERVIEW)
  }

  // Get analytics data
  async getAnalytics(params?: {
    startDate?: string
    endDate?: string
    groupBy?: 'day' | 'week' | 'month'
  }): Promise<ApiResponse<{
    userGrowth: Array<{ date: string; count: number }>
    revenue: Array<{ date: string; amount: number }>
    topProducts: Array<{ id: string; name: string; sales: number }>
    conversionRate: number
    averageOrderValue: number
  }>> {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.ANALYTICS, { params })
  }

  // Get reports
  async getReports(params?: {
    type?: 'users' | 'orders' | 'revenue' | 'products'
    format?: 'json' | 'csv' | 'pdf'
    startDate?: string
    endDate?: string
  }): Promise<ApiResponse<any>> {
    return apiClient.get(API_ENDPOINTS.DASHBOARD.REPORTS, { params })
  }

  // Export dashboard data
  async exportData(format: 'csv' | 'excel' | 'pdf' = 'csv'): Promise<ApiResponse<Blob>> {
    return apiClient.get(`${API_ENDPOINTS.DASHBOARD.STATS}/export`, {
      params: { format },
      responseType: 'blob'
    })
  }

  // Get real-time metrics (if supported by backend)
  async getRealtimeMetrics(): Promise<ApiResponse<{
    activeUsers: number
    currentOrders: number
    serverLoad: number
    responseTime: number
  }>> {
    return apiClient.get(`${API_ENDPOINTS.DASHBOARD.STATS}/realtime`)
  }

  // Get dashboard widgets configuration
  async getWidgets(): Promise<ApiResponse<Array<{
    id: string
    title: string
    type: string
    position: { x: number; y: number; w: number; h: number }
    config: Record<string, any>
    enabled: boolean
  }>>> {
    return apiClient.get(`${API_ENDPOINTS.DASHBOARD.STATS}/widgets`)
  }

  // Update dashboard widgets
  async updateWidgets(widgets: Array<{
    id: string
    position: { x: number; y: number; w: number; h: number }
    enabled: boolean
  }>): Promise<ApiResponse<void>> {
    return apiClient.put(`${API_ENDPOINTS.DASHBOARD.STATS}/widgets`, { widgets })
  }

  // Get dashboard notifications/alerts
  async getAlerts(): Promise<ApiResponse<Array<{
    id: string
    type: 'info' | 'warning' | 'error' | 'success'
    title: string
    message: string
    timestamp: string
    read: boolean
    actionUrl?: string
  }>>> {
    return apiClient.get(`${API_ENDPOINTS.DASHBOARD.STATS}/alerts`)
  }

  // Mark alert as read
  async markAlertRead(alertId: string): Promise<ApiResponse<void>> {
    return apiClient.patch(`${API_ENDPOINTS.DASHBOARD.STATS}/alerts/${alertId}/read`)
  }

  // Mark all alerts as read
  async markAllAlertsRead(): Promise<ApiResponse<void>> {
    return apiClient.patch(`${API_ENDPOINTS.DASHBOARD.STATS}/alerts/read-all`)
  }

  // Get performance metrics
  async getPerformanceMetrics(): Promise<ApiResponse<{
    pageLoadTime: number
    apiResponseTime: number
    errorRate: number
    uptime: number
    memoryUsage: number
    cpuUsage: number
  }>> {
    return apiClient.get(`${API_ENDPOINTS.DASHBOARD.STATS}/performance`)
  }

  // Cache management for dashboard
  clearCache(): void {
    apiClient.clearCacheKey('dashboard:stats')
    apiClient.clearCacheKey('dashboard:overview')
    apiClient.clearCacheKey('analytics:dashboard')
  }

  // Refresh dashboard data
  async refreshData(): Promise<ApiResponse<{
    stats: DashboardStats
    overview: any
    analytics: any
  }>> {
    // Clear cache first
    this.clearCache()

    // Fetch fresh data
    const [stats, overview, analytics] = await Promise.allSettled([
      this.getStats(),
      this.getOverview(),
      this.getAnalytics()
    ])

    return {
      success: true,
      data: {
        stats: stats.status === 'fulfilled' && stats.value.success ? stats.value.data : ({} as any),
        overview: overview.status === 'fulfilled' && overview.value.success ? overview.value.data : ({} as any),
        analytics: analytics.status === 'fulfilled' && analytics.value.success ? analytics.value.data : ({} as any),
      }
    }
  }
}

// Export singleton instance
export const dashboardService = new DashboardService()
export default dashboardService
