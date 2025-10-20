import { toastService } from '~/services/toast.service'
import type { ToastOptions } from '~/types'

// Toast composable for easy toast management in components
export function useToast() {
  // Success toast
  const success = (message: string, options: Partial<ToastOptions> = {}) => {
    return toastService.success(message, options)
  }

  // Error toast
  const error = (message: string, options: Partial<ToastOptions> = {}) => {
    return toastService.error(message, options)
  }

  // Warning toast
  const warning = (message: string, options: Partial<ToastOptions> = {}) => {
    return toastService.warning(message, options)
  }

  // Info toast
  const info = (message: string, options: Partial<ToastOptions> = {}) => {
    return toastService.info(message, options)
  }

  // Loading toast
  const loading = (message: string, options: Partial<ToastOptions> = {}) => {
    return toastService.loading(message, options)
  }

  // Custom toast
  const show = (options: ToastOptions & { type: 'success' | 'error' | 'warning' | 'info' | 'loading' }) => {
    return toastService.show(options)
  }

  // Update toast
  const update = (id: string, updates: Partial<ToastOptions>) => {
    toastService.update(id, updates)
  }

  // Dismiss toast
  const dismiss = (id: string) => {
    toastService.dismiss(id)
  }

  // Dismiss all toasts
  const dismissAll = () => {
    toastService.dismissAll()
  }

  // Dismiss by type
  const dismissByType = (type: 'success' | 'error' | 'warning' | 'info' | 'loading') => {
    toastService.dismissByType(type)
  }

  // Get toasts
  const getToasts = () => {
    return toastService.getToasts()
  }

  // Get toast by ID
  const getToast = (id: string) => {
    return toastService.getToast(id)
  }

  // Set defaults
  const setDefaults = (options: Partial<ToastOptions>) => {
    toastService.setDefaults(options)
  }

  // Promise-based toast (shows loading, then success/error)
  const promise = async <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string | ((result: T) => string)
      error: string | ((error: any) => string)
    },
    options: {
      loading?: Partial<ToastOptions>
      success?: Partial<ToastOptions>
      error?: Partial<ToastOptions>
    } = {}
  ): Promise<T> => {
    const loadingId = toastService.loading(messages.loading, options.loading)

    try {
      const result = await promise

      // Dismiss loading toast
      toastService.dismiss(loadingId)

      // Show success toast
      const successMessage = typeof messages.success === 'function'
        ? messages.success(result)
        : messages.success

      toastService.success(successMessage, options.success)

      return result
    } catch (err) {
      // Dismiss loading toast
      toastService.dismiss(loadingId)

      // Show error toast
      const errorMessage = typeof messages.error === 'function'
        ? messages.error(err)
        : messages.error

      toastService.error(errorMessage, options.error)

      throw err
    }
  }

  return {
    // Basic toast methods
    success,
    error,
    warning,
    info,
    loading,
    show,

    // Management methods
    update,
    dismiss,
    dismissAll,
    dismissByType,

    // Utility methods
    getToasts,
    getToast,
    setDefaults,

    // Advanced methods
    promise
  }
}
