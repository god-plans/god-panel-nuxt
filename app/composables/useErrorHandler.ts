import { useToast } from './useToast'
import type { AppError } from '~/plugins/error-handler.client'

// Error handler composable for components
export function useErrorHandler() {
  const { error: showErrorToast } = useToast()
  const { $errorHandler } = useNuxtApp()

  // Handle error with toast and logging
  const handleError = (
    error: any,
    options: {
      showToast?: boolean
      toastMessage?: string
      logError?: boolean
      context?: Record<string, any>
    } = {}
  ): AppError | null => {
    if (!$errorHandler) return null

    const appError = $errorHandler.handleError(error, {
      showToast: options.showToast !== false,
      logError: options.logError !== false,
      context: options.context
    })

    // Show custom toast message if provided
    if (options.showToast !== false && options.toastMessage) {
      showErrorToast(options.toastMessage)
    }

    return appError
  }

  // Handle async operation with error handling
  const handleAsync = async <T>(
    operation: () => Promise<T>,
    options: {
      showToast?: boolean
      toastMessage?: string
      logError?: boolean
      context?: Record<string, any>
      onSuccess?: (result: T) => void
      onError?: (error: AppError) => void
    } = {}
  ): Promise<T | null> => {
    try {
      const result = await operation()

      if (options.onSuccess) {
        options.onSuccess(result)
      }

      return result
    } catch (error) {
      const appError = handleError(error, {
        showToast: options.showToast,
        toastMessage: options.toastMessage,
        logError: options.logError,
        context: options.context
      })

      if (options.onError && appError) {
        options.onError(appError)
      }

      return null
    }
  }

  // Create error boundary wrapper
  const withErrorBoundary = <T extends (...args: any[]) => any>(
    fn: T,
    options: {
      showToast?: boolean
      toastMessage?: string
      logError?: boolean
      context?: Record<string, any>
      fallback?: any
    } = {}
  ): T => {
    return ((...args: Parameters<T>) => {
      try {
        const result = fn(...args)

        // Handle promises
        if (result && typeof result.then === 'function') {
          return result.catch((error: any) => {
            handleError(error, options)
            return options.fallback
          })
        }

        return result
      } catch (error) {
        handleError(error, options)
        return options.fallback
      }
    }) as T
  }

  // Get error history
  const getErrors = () => {
    return $errorHandler?.getErrors() || []
  }

  // Clear error history
  const clearErrors = () => {
    $errorHandler?.clearErrors()
  }

  // Get recent errors
  const getRecentErrors = (minutes: number = 5) => {
    return $errorHandler?.getRecentErrors(minutes) || []
  }

  return {
    handleError,
    handleAsync,
    withErrorBoundary,
    getErrors,
    clearErrors,
    getRecentErrors
  }
}

