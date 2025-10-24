<template>
  <div class="error-boundary">
    <!-- Error State -->
    <div v-if="hasError" class="error-boundary__error">
      <div class="error-boundary__content">
        <!-- Error Icon -->
        <div class="error-boundary__icon">
          <v-icon size="64" color="error">mdi-alert-circle</v-icon>
        </div>

        <!-- Error Title -->
        <h2 class="error-boundary__title">
          {{ title || 'Something went wrong' }}
        </h2>

        <!-- Error Message -->
        <p class="error-boundary__message" v-if="showMessage">
          {{ errorMessage || 'An unexpected error occurred. Please try again.' }}
        </p>

        <!-- Error Details (Development only) -->
        <details v-if="isDev && showDetails" class="error-boundary__details">
          <summary class="error-boundary__details-toggle">
            <v-icon size="16" class="mr-2">mdi-code-braces</v-icon>
            Error Details
          </summary>
          <pre class="error-boundary__details-content">{{ errorDetails }}</pre>
        </details>

        <!-- Action Buttons -->
        <div class="error-boundary__actions">
          <v-btn
            v-if="showRetry"
            color="primary"
            variant="elevated"
            @click="handleRetry"
            :loading="retrying"
          >
            <v-icon left>mdi-refresh</v-icon>
            Try Again
          </v-btn>

          <v-btn
            v-if="showReport"
            color="secondary"
            variant="outlined"
            @click="handleReport"
          >
            <v-icon left>mdi-bug</v-icon>
            Report Issue
          </v-btn>

          <v-btn
            v-if="showHome"
            color="grey"
            variant="text"
            @click="handleGoHome"
          >
            <v-icon left>mdi-home</v-icon>
            Go Home
          </v-btn>
        </div>

        <!-- Error ID for support -->
        <div v-if="errorId" class="error-boundary__error-id">
          <small class="text-grey-600">
            Error ID: <code>{{ errorId }}</code>
          </small>
        </div>
      </div>
    </div>

    <!-- Success State -->
    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onErrorCaptured } from 'vue'
import type { AppError } from '~/plugins/error-handler.client'
import { ErrorType, ErrorSeverity } from '~/plugins/error-handler.client'

// Props
interface Props {
  title?: string
  showMessage?: boolean
  showDetails?: boolean
  showRetry?: boolean
  showReport?: boolean
  showHome?: boolean
  fallback?: any
  onError?: (error: AppError) => void
  onRetry?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  showMessage: true,
  showDetails: true,
  showRetry: true,
  showReport: true,
  showHome: true
})

// Reactive state
const hasError = ref(false)
const error = ref<AppError | null>(null)
const retrying = ref(false)

// Computed properties
const errorMessage = computed(() => error.value?.message)
const errorDetails = computed(() => {
  if (!error.value) return ''
  return JSON.stringify({
    id: error.value.id,
    type: error.value.type,
    severity: error.value.severity,
    message: error.value.message,
    stack: error.value.stack,
    context: error.value.context,
    timestamp: error.value.timestamp
  }, null, 2)
})
const errorId = computed(() => error.value?.id)
const isDev = computed(() => process.dev)

// Error capture handler
onErrorCaptured((err, instance, info) => {
  hasError.value = true

  // Create structured error
  const appError: AppError = {
    id: `boundary_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    type: ErrorType.RUNTIME,
    severity: ErrorSeverity.HIGH,
    message: err instanceof Error ? err.message : 'Component error',
    details: err,
    stack: err instanceof Error ? err.stack : undefined,
    url: process.client ? window.location.href : undefined,
    timestamp: new Date(),
    context: {
      component: instance?.$?.type?.name || 'Unknown',
      info,
      source: 'error-boundary'
    }
  }

  error.value = appError

  // Call custom error handler
  props.onError?.(appError)

  // Log error using global error handler
  const { $errorHandler, $toast } = useNuxtApp()
  if ($errorHandler) {
    $errorHandler.handleError(appError, { showToast: false })
  }

  // Prevent error from propagating
  return false
})

// Methods
const handleRetry = async () => {
  if (retrying.value) return

  retrying.value = true
  hasError.value = false
  error.value = null

  try {
    // Call custom retry handler
    await props.onRetry?.()

    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 500))
  } catch (err) {
    // If retry fails, show error again
    hasError.value = true
    const { $errorHandler } = useNuxtApp()
    if ($errorHandler) {
      $errorHandler.handleError(err, {
        type: ErrorType.RUNTIME,
        severity: ErrorSeverity.HIGH,
        context: { source: 'error-boundary-retry' }
      })
    }
  } finally {
    retrying.value = false
  }
}

const handleReport = () => {
  if (!error.value) return

  // Create report data
  const reportData = {
    errorId: error.value.id,
    message: error.value.message,
    url: error.value.url,
    userAgent: error.value.userAgent,
    timestamp: error.value.timestamp,
    context: error.value.context
  }

    // Copy to clipboard if available
    if (process.client && navigator.clipboard) {
      navigator.clipboard.writeText(JSON.stringify(reportData, null, 2))
      .then(() => {
        // Show success message
        const { $toast } = useNuxtApp()
        if ($toast) {
          $toast.success('Error details copied to clipboard')
        }
      })
      .catch(() => {
        // Fallback: open in new window
        const reportWindow = window.open('', '_blank')
        if (reportWindow) {
          reportWindow.document.write(`
            <pre>${JSON.stringify(reportData, null, 2)}</pre>
            <p>Please copy this information and send it to support.</p>
          `)
          reportWindow.document.title = 'Error Report'
        }
      })
  }
}

const handleGoHome = () => {
  navigateTo('/')
}

// Expose methods for parent components
defineExpose({
  hasError,
  error,
  retry: handleRetry,
  clearError: () => {
    hasError.value = false
    error.value = null
  }
})
</script>

<style scoped lang="scss">
.error-boundary {
  width: 100%;
  min-height: 200px;
}

.error-boundary__error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 300px;
  padding: 2rem;
  text-align: center;
}

.error-boundary__content {
  max-width: 500px;
}

.error-boundary__icon {
  margin-bottom: 1rem;
  opacity: 0.8;
}

.error-boundary__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 1rem;
}

.error-boundary__message {
  color: rgb(var(--v-theme-on-surface-variant));
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.error-boundary__details {
  margin-bottom: 1.5rem;
  text-align: left;
}

.error-boundary__details-toggle {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 0.5rem;

  &:hover {
    color: rgb(var(--v-theme-primary-variant));
  }
}

.error-boundary__details-content {
  background: rgb(var(--v-theme-surface-variant));
  color: rgb(var(--v-theme-on-surface-variant));
  padding: 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-all;
}

.error-boundary__actions {
  display: flex;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.error-boundary__error-id {
  opacity: 0.7;
}

.error-boundary__error-id code {
  background: rgb(var(--v-theme-surface-variant));
  padding: 0.125rem 0.25rem;
  border-radius: 3px;
  font-size: 0.75rem;
}

// Responsive design
@media (max-width: 600px) {
  .error-boundary__error {
    min-height: 250px;
    padding: 1rem;
  }

  .error-boundary__title {
    font-size: 1.25rem;
  }

  .error-boundary__actions {
    flex-direction: column;
    align-items: center;
  }

  .error-boundary__actions .v-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
