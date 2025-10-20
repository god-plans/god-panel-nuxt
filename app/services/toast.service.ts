import type { Toast, ToastOptions } from '~/types'

// Toast types
export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'

// Toast position
export type ToastPosition =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right'

// Toast service class
export class ToastService {
  private toasts = ref<Toast[]>([])
  private idCounter = 0

  // Default toast options
  private defaultOptions: ToastOptions = {
    duration: 5000,
    position: 'bottom-right',
    dismissible: true,
    pauseOnHover: true,
    showProgress: false
  }

  // Show success toast
  success(message: string, options: Partial<ToastOptions> = {}): string {
    return this.show({
      type: 'success',
      message,
      icon: 'mdi-check-circle',
      ...options
    })
  }

  // Show error toast
  error(message: string, options: Partial<ToastOptions> = {}): string {
    return this.show({
      type: 'error',
      message,
      icon: 'mdi-alert-circle',
      ...options
    })
  }

  // Show warning toast
  warning(message: string, options: Partial<ToastOptions> = {}): string {
    return this.show({
      type: 'warning',
      message,
      icon: 'mdi-alert',
      ...options
    })
  }

  // Show info toast
  info(message: string, options: Partial<ToastOptions> = {}): string {
    return this.show({
      type: 'info',
      message,
      icon: 'mdi-information',
      ...options
    })
  }

  // Show loading toast
  loading(message: string, options: Partial<ToastOptions> = {}): string {
    return this.show({
      type: 'loading',
      message,
      icon: 'mdi-loading',
      duration: 0, // Loading toasts don't auto-dismiss
      ...options
    })
  }

  // Show custom toast
  show(options: ToastOptions & { type: ToastType; message: string }): string {
    const id = this.generateId()
    const toast: Toast = {
      id,
      ...this.defaultOptions,
      ...options,
      createdAt: new Date(),
      visible: true
    }

    // Add to toasts array
    this.toasts.value.unshift(toast)

    // Auto-dismiss if duration is set
    if (toast.duration && toast.duration > 0) {
      this.scheduleDismiss(id, toast.duration)
    }

    // Limit number of toasts
    if (this.toasts.value.length > 10) {
      this.toasts.value = this.toasts.value.slice(0, 10)
    }

    return id
  }

  // Update existing toast
  update(id: string, updates: Partial<ToastOptions>): void {
    const index = this.toasts.value.findIndex(toast => toast.id === id)
    if (index === -1) return

    this.toasts.value[index] = {
      ...this.toasts.value[index],
      ...updates
    }
  }

  // Dismiss toast
  dismiss(id: string): void {
    const index = this.toasts.value.findIndex(toast => toast.id === id)
    if (index === -1) return

    // Mark as not visible
    this.toasts.value[index].visible = false

    // Remove after animation
    setTimeout(() => {
      const removeIndex = this.toasts.value.findIndex(toast => toast.id === id)
      if (removeIndex !== -1) {
        this.toasts.value.splice(removeIndex, 1)
      }
    }, 300) // Match transition duration
  }

  // Dismiss all toasts
  dismissAll(): void {
    this.toasts.value.forEach(toast => {
      this.dismiss(toast.id)
    })
  }

  // Dismiss toasts by type
  dismissByType(type: ToastType): void {
    const toastsToDismiss = this.toasts.value.filter(toast => toast.type === type)
    toastsToDismiss.forEach(toast => this.dismiss(toast.id))
  }

  // Get all toasts
  getToasts(): Toast[] {
    return [...this.toasts.value]
  }

  // Get toast by ID
  getToast(id: string): Toast | undefined {
    return this.toasts.value.find(toast => toast.id === id)
  }

  // Update default options
  setDefaults(options: Partial<ToastOptions>): void {
    this.defaultOptions = { ...this.defaultOptions, ...options }
  }

  // Private methods
  private generateId(): string {
    return `toast_${++this.idCounter}_${Date.now()}`
  }

  private scheduleDismiss(id: string, duration: number): void {
    setTimeout(() => {
      const toast = this.getToast(id)
      if (toast && toast.visible) {
        this.dismiss(id)
      }
    }, duration)
  }

  // Get toasts by position for rendering
  getToastsByPosition(position: ToastPosition): Toast[] {
    return this.toasts.value.filter(toast => toast.position === position)
  }

  // Pause/resume auto-dismiss for hover
  pauseAutoDismiss(id: string): void {
    const toast = this.getToast(id)
    if (toast) {
      this.update(id, { paused: true })
    }
  }

  resumeAutoDismiss(id: string): void {
    const toast = this.getToast(id)
    if (toast) {
      this.update(id, { paused: false })
      // Reschedule dismiss if duration is set
      if (toast.duration && toast.duration > 0) {
        this.scheduleDismiss(id, toast.duration)
      }
    }
  }
}

// Create singleton instance
export const toastService = new ToastService()

// Export default
export default toastService
