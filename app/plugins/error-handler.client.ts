import type { NuxtError } from '#app'
import { logger } from '~/services/logger.service'

// Error types for better categorization
export enum ErrorType {
  NETWORK = 'NETWORK',
  API = 'API',
  VALIDATION = 'VALIDATION',
  AUTHENTICATION = 'AUTHENTICATION',
  AUTHORIZATION = 'AUTHORIZATION',
  BUSINESS_LOGIC = 'BUSINESS_LOGIC',
  RUNTIME = 'RUNTIME',
  UNKNOWN = 'UNKNOWN'
}

// Error severity levels
export enum ErrorSeverity {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  CRITICAL = 'critical'
}

// Structured error interface
export interface AppError {
  id: string
  type: ErrorType
  severity: ErrorSeverity
  message: string
  details?: any
  stack?: string
  url?: string
  userAgent?: string
  timestamp: Date
  userId?: string
  sessionId?: string
  context?: Record<string, any>
  error?: Error
}

// Error handler class
class ErrorHandler {
  private errors: AppError[] = []
  private maxErrors = 100 // Keep last 100 errors
  private isInitialized = false

  // Initialize error handling
  init() {
    if (this.isInitialized || !process.client) return
    this.isInitialized = true

    this.setupGlobalHandlers()
    this.setupVueErrorHandler()
    console.log('🛡️ Global error handler initialized')
  }

  // Setup global JavaScript error handlers
  private setupGlobalHandlers() {
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      event.preventDefault()
      this.handleError(event.reason, {
        type: ErrorType.RUNTIME,
        severity: ErrorSeverity.HIGH,
        context: { source: 'unhandledrejection' }
      })
    })

    // Handle uncaught errors
    window.addEventListener('error', (event) => {
      event.preventDefault()
      this.handleError(event.error, {
        type: ErrorType.RUNTIME,
        severity: ErrorSeverity.HIGH,
        context: {
          source: 'uncaughterror',
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      })
    })

    // Handle Vue warnings in development
    if (process.dev) {
      const originalWarn = console.warn
      console.warn = (...args) => {
        originalWarn.apply(console, args)

        // Log Vue warnings as low severity errors
        if (args[0]?.includes?.('[Vue warn]')) {
          this.logError({
            id: this.generateId(),
            type: ErrorType.RUNTIME,
            severity: ErrorSeverity.LOW,
            message: args.join(' '),
            timestamp: new Date(),
            context: { source: 'vue-warn' }
          })
        }
      }
    }
  }

  // Setup Vue error handler
  private setupVueErrorHandler() {
    // This will be called from the Nuxt plugin
  }

  // Main error handling method
  handleError(error: any, options: {
    type?: ErrorType
    severity?: ErrorSeverity
    context?: Record<string, any>
    showToast?: boolean
    logError?: boolean
  } = {}) {
    const appError = this.createAppError(error, options)

    // Add to error collection
    this.errors.unshift(appError)
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(0, this.maxErrors)
    }

    // Log error if enabled
    if (options.logError !== false) {
      this.logError(appError)
    }

    // Show toast notification if enabled
    if (options.showToast !== false) {
      this.showErrorToast(appError)
    }

    // Report to external service if configured
    this.reportError(appError)

    return appError
  }

  // Create structured error object
  private createAppError(error: any, options: any): AppError {
    const now = new Date()
    let message = 'An unexpected error occurred'
    let type = options.type || ErrorType.UNKNOWN
    let severity = options.severity || ErrorSeverity.MEDIUM
    let details: any = null
    let stack: string | undefined

    // Extract information from different error types
    if (error instanceof Error) {
      message = error.message
      stack = error.stack
    } else if (typeof error === 'string') {
      message = error
    } else if (error && typeof error === 'object') {
      // API error response
      if (error.response?.data) {
        const apiError = error.response.data
        message = apiError.message || apiError.error || message
        details = apiError

        // Determine error type from status code
        const status = error.response.status
        if (status === 401) {
          type = ErrorType.AUTHENTICATION
          severity = ErrorSeverity.MEDIUM
        } else if (status === 403) {
          type = ErrorType.AUTHORIZATION
          severity = ErrorSeverity.MEDIUM
        } else if (status === 422) {
          type = ErrorType.VALIDATION
          severity = ErrorSeverity.LOW
        } else if (status >= 500) {
          type = ErrorType.API
          severity = ErrorSeverity.HIGH
        } else {
          type = ErrorType.API
          severity = ErrorSeverity.MEDIUM
        }
      } else if (error.code === 'NETWORK_ERROR' || error.code === 'ECONNABORTED') {
        type = ErrorType.NETWORK
        message = 'Network connection failed. Please check your internet connection.'
        severity = ErrorSeverity.MEDIUM
      }
    }

    // Override with provided options
    if (options.type) type = options.type
    if (options.severity) severity = options.severity

    return {
      id: this.generateId(),
      type,
      severity,
      message,
      details,
      stack,
      url: process.client ? window.location.href : undefined,
      userAgent: process.client ? navigator.userAgent : undefined,
      timestamp: now,
      userId: this.getCurrentUserId(),
      sessionId: this.getSessionId(),
      context: options.context
    }
  }

  // Generate unique error ID
  private generateId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Get current user ID
  private getCurrentUserId(): string | undefined {
    if (!process.client) return undefined

    try {
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      return user.id
    } catch {
      return undefined
    }
  }

  // Get session ID
  private getSessionId(): string | undefined {
    if (!process.client) return undefined

    // Try to get from localStorage or generate one
    let sessionId = localStorage.getItem('session_id')
    if (!sessionId) {
      sessionId = this.generateId()
      localStorage.setItem('session_id', sessionId)
    }
    return sessionId
  }

  // Log error using logger service
  private logError(error: AppError) {
    const logContext = {
      errorId: error.id,
      errorType: error.type,
      severity: error.severity,
      url: error.url,
      userId: error.userId,
      sessionId: error.sessionId,
      userAgent: error.userAgent,
      context: error.context
    }

    // Log based on severity using logger service
    switch (error.severity) {
      case ErrorSeverity.LOW:
        logger.debug(`Error: ${error.message}`, logContext)
        break
      case ErrorSeverity.MEDIUM:
        logger.warn(`Error: ${error.message}`, logContext)
        break
      case ErrorSeverity.HIGH:
        logger.error(error.error || error.message, logContext)
        break
      case ErrorSeverity.CRITICAL:
        logger.fatal(error.error || error.message, logContext)
        break
    }
  }

  // Show error toast notification
  private showErrorToast(error: AppError) {
    // Use toast service instead of legacy snackbar
    const { $toast } = useNuxtApp()
    if (!$toast) return

    // Customize message based on error type
    let toastMessage = error.message

    // Don't show toast for low severity errors
    if (error.severity === ErrorSeverity.LOW) return

    // Show error toast
    $toast.error(toastMessage, {
      duration: error.severity === ErrorSeverity.CRITICAL ? 10000 : 5000
    })
  }

  // Report error to external service (Sentry, LogRocket, etc.)
  private reportError(error: AppError) {
    // Only report high severity errors in production
    if (process.dev || error.severity === ErrorSeverity.LOW) return

    // TODO: Integrate with error reporting service
    // Example: Sentry, LogRocket, Bugsnag, etc.
    /*
    if (process.env.ERROR_REPORTING_ENABLED) {
      // Send to error reporting service
      errorReportingService.captureException(error)
    }
    */
  }

  // Get all errors (for debugging)
  getErrors(): AppError[] {
    return [...this.errors]
  }

  // Clear error history
  clearErrors(): void {
    this.errors = []
  }

  // Get errors by type
  getErrorsByType(type: ErrorType): AppError[] {
    return this.errors.filter(error => error.type === type)
  }

  // Get recent errors (last N minutes)
  getRecentErrors(minutes: number = 5): AppError[] {
    const cutoff = new Date(Date.now() - minutes * 60 * 1000)
    return this.errors.filter(error => error.timestamp > cutoff)
  }
}

// Create singleton instance
const errorHandler = new ErrorHandler()

// Nuxt plugin
export default defineNuxtPlugin((nuxtApp) => {
  // Initialize error handler
  errorHandler.init()

  // Handle Vue errors
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    errorHandler.handleError(error, {
      type: ErrorType.RUNTIME,
      severity: ErrorSeverity.HIGH,
      context: {
        component: instance?.$?.type?.name || 'Unknown',
        info,
        source: 'vue-error-handler'
      }
    })
  }

  // Handle Nuxt errors
  nuxtApp.hook('app:error', (error) => {
    errorHandler.handleError(error, {
      type: ErrorType.RUNTIME,
      severity: ErrorSeverity.HIGH,
      context: {
        source: 'nuxt-app-error'
      }
    })
  })

  // Provide error handler globally
  return {
    provide: {
      errorHandler
    }
  }
})

// Export for direct usage
export { errorHandler }
