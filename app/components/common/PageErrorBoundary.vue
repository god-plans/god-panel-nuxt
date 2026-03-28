<template>
  <div class="page-error-boundary">
    <div v-if="loading" class="page-error-boundary__loading">
      <GkSpinner size="md" />
      <p class="mt-4 opacity-70">Loading...</p>
    </div>

    <div v-else-if="hasError" class="page-error-boundary__error">
      <div class="page-error-boundary__container">
        <div class="page-error-boundary__illustration opacity-60">
          <AppIcon name="file-question" :size="120" class="text-[var(--gk-color-on-surface-muted)]" />
        </div>

        <div class="page-error-boundary__content">
          <h1 class="page-error-boundary__title">
            {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
          </h1>

          <p class="page-error-boundary__message">
            {{ errorMessage }}
          </p>

          <div class="page-error-boundary__actions">
            <GkButton variant="primary" size="md" :loading="retrying" @click="handleRetry">
              <AppIcon name="refresh" class="me-2" :size="18" />
              Try Again
            </GkButton>

            <GkButton variant="secondary" size="md" @click="handleGoBack">
              <AppIcon name="arrow-left" class="me-2" :size="18" />
              Go Back
            </GkButton>

            <GkButton variant="ghost" size="md" @click="handleGoHome">
              <AppIcon name="home" class="me-2" :size="18" />
              Home
            </GkButton>
          </div>

          <details v-if="isDev && error" class="page-error-boundary__debug text-left mt-8">
            <summary class="cursor-pointer text-[var(--gk-color-primary)] font-medium mb-2">
              <AppIcon name="bug" class="me-1 inline" :size="16" />
              Debug Information
            </summary>
            <div class="debug-info font-mono text-sm">
              <div class="debug-item mb-2">
                <strong>Status Code:</strong> {{ error.statusCode }}
              </div>
              <div class="debug-item mb-2">
                <strong>Path:</strong> {{ error.path || route.path }}
              </div>
              <div class="debug-item mb-2">
                <strong>Timestamp:</strong> {{ new Date().toISOString() }}
              </div>
              <div v-if="error.message" class="debug-item mb-2">
                <strong>Message:</strong> {{ error.message }}
              </div>
              <pre v-if="error.stack" class="bg-[var(--gk-color-border)] p-4 rounded-lg overflow-x-auto text-xs mt-2">{{ error.stack }}</pre>
            </div>
          </details>
        </div>
      </div>
    </div>

    <div v-else>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onErrorCaptured, watch } from 'vue'
import { GkButton, GkSpinner } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'
import { ErrorType, ErrorSeverity } from '~/plugins/error-handler.client'

interface Props {
  loading?: boolean
  error?: Record<string, unknown> | null
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

const route = useRoute()
const router = useRouter()

const hasError = ref(false)
const capturedError = ref<unknown>(null)
const retrying = ref(false)

const errorMessage = computed(() => {
  if (props.error) {
    return (props.error as { message?: string }).message || 'An unexpected error occurred.'
  }
  if (capturedError.value && capturedError.value instanceof Error) {
    return capturedError.value.message || 'An unexpected error occurred.'
  }
  return 'The page could not be loaded. Please try again.'
})

const isDev = computed(() => process.dev)

const error = computed(() => (props.error ?? capturedError.value) as { statusCode?: number; path?: string; message?: string; stack?: string } | null)

onErrorCaptured((err, instance, info) => {
  hasError.value = true
  capturedError.value = err

  const { $errorHandler } = useNuxtApp()
  if ($errorHandler) {
    $errorHandler.handleError(err, {
      type: ErrorType.RUNTIME,
      severity: ErrorSeverity.HIGH,
      context: {
        component: instance?.$?.type?.name || 'Unknown',
        info,
        source: 'page-error-boundary',
        route: route.path
      }
    })
  }

  return false
})

watch(() => props.error, (newError) => {
  hasError.value = !!newError
  capturedError.value = newError
})

const handleRetry = async () => {
  if (retrying.value) return

  retrying.value = true
  hasError.value = false
  capturedError.value = null

  try {
    await router.go(0)
  } catch (err) {
    retrying.value = false
    hasError.value = true

    const { $errorHandler } = useNuxtApp()
    if ($errorHandler) {
      $errorHandler.handleError(err, {
        type: ErrorType.RUNTIME,
        severity: ErrorSeverity.MEDIUM,
        context: { source: 'page-error-boundary-retry' }
      })
    }
  }
}

const handleGoBack = () => {
  if (import.meta.client && window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const handleGoHome = () => {
  router.push('/')
}

onMounted(() => {
  if (props.error) {
    hasError.value = true
    capturedError.value = props.error
  }
})
</script>

<style scoped>
.page-error-boundary {
  width: 100%;
  min-height: 60vh;
}

.page-error-boundary__loading,
.page-error-boundary__error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.page-error-boundary__container {
  max-width: 600px;
  text-align: center;
}

.page-error-boundary__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--gk-color-on-surface);
  margin-bottom: 1rem;
}

.page-error-boundary__message {
  font-size: 1.125rem;
  color: var(--gk-color-on-surface-muted);
  margin-bottom: 2rem;
  line-height: 1.6;
}

.page-error-boundary__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.debug-item strong {
  color: var(--gk-color-primary);
}

@media (max-width: 600px) {
  .page-error-boundary__title {
    font-size: 1.75rem;
  }

  .page-error-boundary__actions {
    flex-direction: column;
    align-items: center;
  }
}
</style>
