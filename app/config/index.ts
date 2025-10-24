import { z } from 'zod'

// Environment configuration schema
const envSchema = z.object({
  // API Configuration
  API_URL: z.string().url(),
  API_TIMEOUT: z.coerce.number().default(10000),

  // Authentication
  JWT_SECRET: z.string().optional(),
  REFRESH_TOKEN_EXPIRY: z.string().default('7d'),

  // App Configuration
  APP_NAME: z.string().default('God Panel'),
  APP_VERSION: z.string().default('1.0.0'),
  APP_ENV: z.enum(['development', 'staging', 'production']).default('development'),

  // External Services
  SITE_URL: z.string().url().optional(),

  // Feature Flags
  ENABLE_MOCK_DATA: z.coerce.boolean().default(false),
  ENABLE_API_LOGGING: z.coerce.boolean().default(false),
})

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse({
      API_URL: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000',
      API_TIMEOUT: process.env.API_TIMEOUT || '10000',
      JWT_SECRET: process.env.JWT_SECRET,
      REFRESH_TOKEN_EXPIRY: process.env.REFRESH_TOKEN_EXPIRY || '7d',
      APP_NAME: process.env.NUXT_PUBLIC_APP_NAME || 'God Panel',
      APP_VERSION: process.env.NUXT_PUBLIC_APP_VERSION || '1.0.0',
      APP_ENV: process.env.APP_ENV || 'development',
      SITE_URL: process.env.NUXT_PUBLIC_SITE_URL,
      ENABLE_MOCK_DATA: process.env.ENABLE_MOCK_DATA || 'false',
      ENABLE_API_LOGGING: process.env.ENABLE_API_LOGGING || 'false',
    })
  } catch (error) {
    console.error('Environment validation failed:', error)
    throw new Error('Invalid environment configuration')
  }
}

export const config = parseEnv()

// Runtime configuration for Nuxt
export const runtimeConfig = {
  public: {
    apiUrl: config.API_URL,
    appName: config.APP_NAME,
    version: config.APP_VERSION,
    siteUrl: config.SITE_URL,
    enableMockData: config.ENABLE_MOCK_DATA,
  },
  private: {
    jwtSecret: config.JWT_SECRET,
    refreshTokenExpiry: config.REFRESH_TOKEN_EXPIRY,
  }
}

// API Configuration
export const apiConfig = {
  baseURL: config.API_URL,
  timeout: config.API_TIMEOUT,
  retries: 3,
  retryDelay: 1000,
  enableLogging: config.ENABLE_API_LOGGING,
}

// Cache configuration
export const cacheConfig = {
  ttl: 5 * 60 * 1000, // 5 minutes
  maxSize: 100, // Maximum cache entries
}

// Request/Response configuration
export const requestConfig = {
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
}

// Error handling configuration
export const errorConfig = {
  networkErrorMessage: 'Network error. Please check your connection.',
  serverErrorMessage: 'Server error. Please try again later.',
  timeoutErrorMessage: 'Request timeout. Please try again.',
  unauthorizedErrorMessage: 'Session expired. Please login again.',
  forbiddenErrorMessage: 'Access denied.',
  notFoundErrorMessage: 'Resource not found.',
}
