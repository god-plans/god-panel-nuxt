import { reactive, readonly, ref } from 'vue'
import { clearGkSnackbars, pushGkSnackbar } from 'god-kit/vue'

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

const POSITION_TO_LOCATION: Record<NonNullable<ToastOptions['position']>, string> = {
  'bottom-right': 'bottom end',
  'bottom-left': 'bottom start',
  'bottom-center': 'bottom center',
  'top-right': 'top end',
  'top-left': 'top start',
  'top-center': 'top center',
}

const config = reactive({
  position: 'bottom-right' as ToastOptions['position'],
  duration: 5000,
  maxToasts: 5,
})

let toastIdCounter = 0
const generateId = () => `toast-${++toastIdCounter}`

/** Kept for API compatibility; snackbars are rendered by `GkSnackbarHost`. */
const toasts = ref<Toast[]>([])

const dismissById = new Map<string, () => void>()

function mapVariant(
  type: Toast['type']
): 'neutral' | 'info' | 'success' | 'warning' | 'danger' {
  switch (type) {
    case 'success':
      return 'success'
    case 'error':
      return 'danger'
    case 'warning':
      return 'warning'
    case 'info':
      return 'info'
    case 'loading':
    default:
      return 'neutral'
  }
}

function buildText(message: string, options: ToastOptions): string {
  const parts: string[] = []
  if (options.action?.label) {
    parts.push(`[${options.action.label}]`)
  }
  parts.push(options.description ?? message)
  return parts.join(' ')
}

const addToast = (type: Toast['type'], message: string, options: ToastOptions = {}) => {
  const id = generateId()
  const position: NonNullable<ToastOptions['position']> =
    options.position ?? config.position ?? 'bottom-right'
  const location = POSITION_TO_LOCATION[position] ?? 'bottom end'
  const duration = options.persistent ? -1 : options.duration ?? config.duration
  const title = options.title
  const text = buildText(message, options)

  const { dismiss } = pushGkSnackbar({
    id,
    title,
    text,
    message: text,
    variant: mapVariant(type),
    timeout: type === 'loading' ? -1 : duration,
    loading: type === 'loading',
    location,
  })

  dismissById.set(id, dismiss)

  if (dismissById.size > config.maxToasts) {
    const first = dismissById.keys().next().value as string | undefined
    if (first) removeToast(first)
  }

  return id
}

const removeToast = (id: string) => {
  const dismiss = dismissById.get(id)
  if (dismiss) {
    dismiss()
    dismissById.delete(id)
  }
}

const clearAll = () => {
  clearGkSnackbars()
  dismissById.clear()
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
  return addToast('loading', message, options)
}

const promise = async <T>(
  promiseArg: Promise<T>,
  messages: {
    loading: string
    success: string
    error: string
  },
  options?: ToastOptions
): Promise<T> => {
  const loadingId = loading(messages.loading, options)

  try {
    const result = await promiseArg
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
    success,
    error,
    warning,
    info,
    loading,
    promise,
    removeToast,
    clearAll,
    toasts: readonly(toasts),
    config: readonly(config),
    updateConfig: (newConfig: Partial<typeof config>) => {
      Object.assign(config, newConfig)
    },
  }
}
