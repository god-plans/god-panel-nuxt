import { ref, reactive } from 'vue'

export interface ToastOptions {
  title?: string
  description?: string
  duration?: number
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center'
  closable?: boolean
  persistent?: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

export interface Toast {
  id: string
  type: 'success' | 'error' | 'warning' | 'info' | 'loading'
  title?: string
  description?: string
  duration: number
  position: ToastOptions['position']
  closable: boolean
  persistent: boolean
  action?: ToastOptions['action']
  timestamp: number
}

const toasts = ref<Toast[]>([])
const config = reactive({
  position: 'bottom-right' as ToastOptions['position'],
  duration: 5000,
  maxToasts: 5
})

let toastIdCounter = 0

const generateId = () => `toast-${++toastIdCounter}`

const addToast = (type: Toast['type'], message: string, options: ToastOptions = {}) => {
  const id = generateId()
  const toast: Toast = {
    id,
    type,
    title: options.title,
    description: message,
    duration: options.duration || config.duration,
    position: options.position || config.position,
    closable: options.closable !== false,
    persistent: options.persistent || false,
    action: options.action,
    timestamp: Date.now()
  }

  toasts.value.push(toast)

  // Remove toast after duration (unless persistent)
  if (!toast.persistent && toast.duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, toast.duration)
  }

  // Limit number of toasts
  if (toasts.value.length > config.maxToasts) {
    toasts.value.shift()
  }

  return id
}

const removeToast = (id: string) => {
  const index = toasts.value.findIndex(toast => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const clearAll = () => {
  toasts.value = []
}

const success = (message: string, options?: ToastOptions) => {
  return addToast('success', message, options)
}

const error = (message: string, options?: ToastOptions) => {
  return addToast('error', message, options)
}

const warning = (message: string, options?: ToastOptions) => {
  return addToast('warning', message, options)
}

const info = (message: string, options?: ToastOptions) => {
  return addToast('info', message, options)
}

const loading = (message: string, options?: ToastOptions) => {
  return addToast('loading', message, { ...options, persistent: true })
}

const promise = async <T>(
  promise: Promise<T>,
  messages: {
    loading: string
    success: string
    error: string
  },
  options?: ToastOptions
): Promise<T> => {
  const loadingId = loading(messages.loading, options)
  
  try {
    const result = await promise
    removeToast(loadingId)
    success(messages.success, options)
    return result
  } catch (err) {
    removeToast(loadingId)
    error(messages.error, options)
    throw err
  }
}

export const useToast = () => {
  return {
    // Toast methods
    success,
    error,
    warning,
    info,
    loading,
    promise,
    
    // Management methods
    removeToast,
    clearAll,
    
    // State
    toasts: readonly(toasts),
    config: readonly(config),
    
    // Update config
    updateConfig: (newConfig: Partial<typeof config>) => {
      Object.assign(config, newConfig)
    }
  }
}