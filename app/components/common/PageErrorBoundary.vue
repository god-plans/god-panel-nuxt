<template>
  <div class="page-error-boundary">
    <!-- Loading State -->
    <div v-if="loading" class="page-error-boundary__loading">
      <v-progress-circular
        indeterminate
        color="primary"
        size="40"
      />
      <p class="mt-4 text-grey-600">Loading...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="hasError" class="page-error-boundary__error">
      <div class="page-error-boundary__container">
        <!-- Error Illustration -->
        <div class="page-error-boundary__illustration">
          <v-icon size="120" color="grey-lighten-1">mdi-file-question</v-icon>
        </div>

        <!-- Error Content -->
        <div class="page-error-boundary__content">
          <h1 class="page-error-boundary__title">
            {{ error?.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
          </h1>

          <p class="page-error-boundary__message">
            {{ errorMessage }}
          </p>

          <!-- Error Actions -->
          <div class="page-error-boundary__actions">
            <v-btn
              color="primary"
              variant="elevated"
              size="large"
              @click="handleRetry"
              :loading="retrying"
            >
              <v-icon left>mdi-refresh</v-icon>
              Try Again
            </v-btn>

            <v-btn
              color="secondary"
              variant="outlined"
              size="large"
              @click="handleGoBack"
            >
              <v-icon left>mdi-arrow-left</v-icon>
              Go Back
            </v-btn>

            <v-btn
              color="grey-darken-1"
              variant="text"
              size="large"
              @click="handleGoHome"
            >
              <v-icon left>mdi-home</v-icon>
              Home
            </v-btn>
          </div>

          <!-- Error Details for Development -->
          <div v-if="isDev && error" class="page-error-boundary__debug">
            <v-expansion-panels variant="accordion">
              <v-expansion-panel>
                <v-expansion-panel-title>
                  <v-icon left>mdi-bug</v-icon>
                  Debug Information
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  <div class="debug-info">
                    <div class="debug-item">
                      <strong>Status Code:</strong> {{ error.statusCode }}
                    </div>
                    <div class="debug-item">
                      <strong>Path:</strong> {{ error.path || $route.path }}
                    </div>
                    <div class="debug-item">
                      <strong>Timestamp:</strong> {{ new Date().toISOString() }}
                    </div>
                    <div v-if="error.message" class="debug-item">
                      <strong>Message:</strong> {{ error.message }}
                    </div>
                    <div v-if="error.stack" class="debug-item">
                      <strong>Stack:</strong>
                      <pre>{{ error.stack }}</pre>
                    </div>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
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
import { ref, computed, onMounted, onErrorCaptured } from 'vue'
import { ErrorType, ErrorSeverity } from '~/plugins/error-handler.client'

// Props
interface Props {
  loading?: boolean
  error?: any
}

const props = withDefaults(defineProps<Props>(), {
  loading: false
})

// Composables
const route = useRoute()
const router = useRouter()

// Reactive state
const hasError = ref(false)
const capturedError = ref<any>(null)
const retrying = ref(false)

// Computed properties
const errorMessage = computed(() => {
  if (props.error) {
    return props.error.message || 'An unexpected error occurred.'
  }

  if (capturedError.value) {
    return capturedError.value.message || 'An unexpected error occurred.'
  }

  return 'The page could not be loaded. Please try again.'
})

const isDev = computed(() => process.dev)

// Error capture handler
onErrorCaptured((err, instance, info) => {
  hasError.value = true
  capturedError.value = err

  // Log error using global error handler
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

  // Prevent error from propagating
  return false
})

// Watch for prop error changes
watch(() => props.error, (newError) => {
  hasError.value = !!newError
  capturedError.value = newError
})

// Methods
const handleRetry = async () => {
  if (retrying.value) return

  retrying.value = true
  hasError.value = false
  capturedError.value = null

  try {
    // Reload the page
    await router.go(0)
  } catch (err) {
    retrying.value = false
    hasError.value = true

    // Log retry error
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
  if (window.history.length > 1) {
    router.back()
  } else {
    router.push('/')
  }
}

const handleGoHome = () => {
  router.push('/')
}

// Initialize
onMounted(() => {
  if (props.error) {
    hasError.value = true
    capturedError.value = props.error
  }
})
</script>

<style scoped lang="scss">
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

.page-error-boundary__illustration {
  margin-bottom: 2rem;
  opacity: 0.6;
}

.page-error-boundary__content {
  max-width: 500px;
  margin: 0 auto;
}

.page-error-boundary__title {
  font-size: 2.5rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 1rem;

  @media (max-width: 600px) {
    font-size: 2rem;
  }
}

.page-error-boundary__message {
  font-size: 1.125rem;
  color: rgb(var(--v-theme-on-surface-variant));
  margin-bottom: 2rem;
  line-height: 1.6;
}

.page-error-boundary__actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
}

.page-error-boundary__debug {
  margin-top: 2rem;
  text-align: left;
}

.debug-info {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 0.875rem;
}

.debug-item {
  margin-bottom: 0.5rem;

  strong {
    color: rgb(var(--v-theme-primary));
  }

  pre {
    background: rgb(var(--v-theme-surface-variant));
    color: rgb(var(--v-theme-on-surface-variant));
    padding: 1rem;
    border-radius: 8px;
    margin-top: 0.5rem;
    overflow-x: auto;
    white-space: pre-wrap;
    word-break: break-all;
    font-size: 0.75rem;
  }
}

// Dark theme adjustments
.v-theme--dark {
  .page-error-boundary__illustration .v-icon {
    color: rgba(255, 255, 255, 0.3) !important;
  }
}

// Responsive design
@media (max-width: 600px) {
  .page-error-boundary__container {
    padding: 1rem;
  }

  .page-error-boundary__title {
    font-size: 1.75rem;
  }

  .page-error-boundary__message {
    font-size: 1rem;
  }
}
</style>
