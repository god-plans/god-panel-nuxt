<template>
  <div class="error-boundary">
    <div v-if="hasError" class="error-boundary__error">
      <div class="error-boundary__content">
        <div class="error-boundary__icon mb-4 opacity-90">
          <AppIcon name="alert-circle" :size="64" class="text-[var(--gk-color-danger)]" />
        </div>

        <h2 class="error-boundary__title">
          {{ title || 'Something went wrong' }}
        </h2>

        <p v-if="showMessage" class="error-boundary__message">
          {{ errorMessage || 'An unexpected error occurred. Please try again.' }}
        </p>

        <details v-if="isDev && showDetails" class="error-boundary__details text-left mb-6">
          <summary class="cursor-pointer flex items-center text-[var(--gk-color-primary)] text-sm mb-2">
            <AppIcon name="code-braces" class="me-2" :size="16" />
            Error Details
          </summary>
          <pre class="error-boundary__details-content">{{ errorDetails }}</pre>
        </details>

        <div class="error-boundary__actions">
          <GkButton v-if="showRetry" variant="primary" :loading="retrying" @click="handleRetry">
            <AppIcon name="refresh" class="me-2" :size="18" />
            Try Again
          </GkButton>

          <GkButton v-if="showReport" variant="secondary" @click="handleReport">
            <AppIcon name="bug" class="me-2" :size="18" />
            Report Issue
          </GkButton>

          <GkButton v-if="showHome" variant="ghost" @click="handleGoHome">
            <AppIcon name="home" class="me-2" :size="18" />
            Go Home
          </GkButton>
        </div>

        <div v-if="errorId" class="error-boundary__error-id opacity-70">
          <small>
            Error ID: <code class="bg-[var(--gk-color-border)] px-1 rounded text-xs">{{ errorId }}</code>
          </small>
        </div>
      </div>
    </div>

    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onErrorCaptured } from 'vue'
import { GkButton, pushGkSnackbar } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'
import type { AppError } from '~/plugins/error-handler.client'
import { ErrorType, ErrorSeverity } from '~/plugins/error-handler.client'

interface Props {
  title?: string
  showMessage?: boolean
  showDetails?: boolean
  showRetry?: boolean
  showReport?: boolean
  showHome?: boolean
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

const hasError = ref(false)
const error = ref<AppError | null>(null)
const retrying = ref(false)

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

onErrorCaptured((err, instance, info) => {
  hasError.value = true

  const appError: AppError = {
    id: `boundary_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`,
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

  props.onError?.(appError)

  const { $errorHandler } = useNuxtApp()
  if ($errorHandler) {
    $errorHandler.handleError(appError, { showToast: false })
  }

  return false
})

const handleRetry = async () => {
  if (retrying.value) return

  retrying.value = true
  hasError.value = false
  error.value = null

  try {
    await props.onRetry?.()
    await new Promise(resolve => setTimeout(resolve, 500))
  } catch (err) {
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

  const reportData = {
    errorId: error.value.id,
    message: error.value.message,
    url: error.value.url,
    userAgent: error.value.userAgent,
    timestamp: error.value.timestamp,
    context: error.value.context
  }

  if (process.client && navigator.clipboard) {
    void navigator.clipboard.writeText(JSON.stringify(reportData, null, 2)).then(() => {
      pushGkSnackbar({
        message: 'Error details copied to clipboard',
        variant: 'success',
        timeout: 4000,
      })
    }).catch(() => {
      const reportWindow = window.open('', '_blank')
      if (reportWindow) {
        reportWindow.document.write(`<pre>${JSON.stringify(reportData, null, 2)}</pre>`)
        reportWindow.document.title = 'Error Report'
      }
    })
  }
}

const handleGoHome = () => {
  navigateTo('/')
}

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

<style scoped>
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

.error-boundary__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
  margin-bottom: 1rem;
}

.error-boundary__message {
  color: var(--gk-color-on-surface-muted);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.error-boundary__details-content {
  background: var(--gk-color-border);
  color: var(--gk-color-on-surface);
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

@media (max-width: 600px) {
  .error-boundary__actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
