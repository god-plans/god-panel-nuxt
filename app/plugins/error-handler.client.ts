import { pushGkSnackbar } from 'god-kit/vue'

/**
 * Catches errors Vue/Nuxt would otherwise swallow, logs them, and surfaces one
 * snackbar so the user is never left staring at a silently broken screen.
 *
 * To forward to Sentry (or any reporter), set `NUXT_PUBLIC_SENTRY_DSN` and call
 * your SDK inside `report()` — that is the only place that needs to change.
 */
function report(error: unknown, context: string) {
  console.error(`[${context}]`, error)

  const { sentryDsn } = useRuntimeConfig().public
  if (!sentryDsn || import.meta.dev) return
  // e.g. Sentry.captureException(error instanceof Error ? error : new Error(String(error)))
}

function notify(error: unknown) {
  pushGkSnackbar({
    message: error instanceof Error ? error.message : 'Something went wrong.',
    variant: 'danger',
    timeout: 5000,
  })
}

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.config.errorHandler = (error, _instance, info) => {
    report(error, `vue:${info}`)
    notify(error)
  }

  nuxtApp.hook('vue:error', (error) => {
    report(error, 'vue')
  })

  window.addEventListener('unhandledrejection', (event) => {
    report(event.reason, 'unhandledrejection')
  })
})
