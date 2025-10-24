// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    ME: '/auth/me',
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
    VERIFY_EMAIL: '/auth/verify-email',
    RESET_PASSWORD: '/auth/reset-password',
    FORGOT_PASSWORD: '/auth/forgot-password',
  },

  // Users
  USERS: {
    LIST: '/users',
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    PROFILE: (id: string) => `/users/${id}/profile`,
    PERMISSIONS: (id: string) => `/users/${id}/permissions`,
    ROLES: '/users/roles',
  },

  // Dashboard
  DASHBOARD: {
    STATS: '/dashboard/stats',
    OVERVIEW: '/dashboard/overview',
    ANALYTICS: '/dashboard/analytics',
    REPORTS: '/dashboard/reports',
  },

  // Settings
  SETTINGS: {
    USER: '/settings/user',
    SYSTEM: '/settings/system',
    PREFERENCES: '/settings/preferences',
  },

  // Groups/Projects
  GROUPS: {
    LIST: '/groups',
    CREATE: '/groups',
    UPDATE: (id: string) => `/groups/${id}`,
    DELETE: (id: string) => `/groups/${id}`,
    MEMBERS: (id: string) => `/groups/${id}/members`,
    ADD_MEMBER: (id: string) => `/groups/${id}/members`,
    REMOVE_MEMBER: (id: string, userId: string) => `/groups/${id}/members/${userId}`,
  },

  // Analytics
  ANALYTICS: {
    USERS: '/analytics/users',
    GROUPS: '/analytics/groups',
    DASHBOARD: '/analytics/dashboard',
    REPORTS: '/analytics/reports',
  },
} as const

// Request Methods
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const

// Cache Keys
export const CACHE_KEYS = {
  AUTH_USER: 'auth:user',
  DASHBOARD_STATS: 'dashboard:stats',
  DASHBOARD_OVERVIEW: 'dashboard:overview',
  USER_LIST: 'users:list',
  GROUP_LIST: 'groups:list',
  ANALYTICS_USERS: 'analytics:users',
  ANALYTICS_DASHBOARD: 'analytics:dashboard',
} as const

// Error Types
export const ERROR_TYPES = {
  NETWORK: 'NETWORK_ERROR',
  TIMEOUT: 'TIMEOUT_ERROR',
  UNAUTHORIZED: 'UNAUTHORIZED_ERROR',
  FORBIDDEN: 'FORBIDDEN_ERROR',
  NOT_FOUND: 'NOT_FOUND_ERROR',
  SERVER: 'SERVER_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR',
} as const

// Retry Configuration
export const RETRY_CONFIG = {
  MAX_RETRIES: 3,
  RETRY_DELAY: 1000, // 1 second
  RETRY_MULTIPLIER: 2, // Exponential backoff
  RETRY_STATUS_CODES: [408, 429, 500, 502, 503, 504], // Status codes to retry
} as const

// Request/Response Headers
export const HEADERS = {
  CONTENT_TYPE: 'Content-Type',
  AUTHORIZATION: 'Authorization',
  ACCEPT: 'Accept',
  X_REQUESTED_WITH: 'X-Requested-With',
  X_API_KEY: 'X-API-Key',
} as const

// Content Types
export const CONTENT_TYPES = {
  JSON: 'application/json',
  FORM_DATA: 'multipart/form-data',
  URL_ENCODED: 'application/x-www-form-urlencoded',
} as const

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth-token',
  REFRESH_TOKEN: 'refresh-token',
  USER_PREFERENCES: 'user-preferences',
  THEME_SETTINGS: 'theme-settings',
  LANGUAGE: 'language',
} as const
