<template>
  <!--
    Nuxt renders this file — and only this file — for unhandled errors and 404s.
    It sits beside `app.vue` on purpose: a page under `pages/` would just be a
    route named `/error` and would never be shown when something breaks.
  -->
  <div class="error-page panel-page">
    <div class="panel-card w-full max-w-xl p-8 text-center md:p-10">
      <AppIcon
        :name="isNotFound ? 'file-question' : 'alert-circle'"
        :size="96"
        class="text-[var(--gk-color-on-surface-muted)] opacity-60"
      />

      <p class="panel-kicker mt-6">{{ error.statusCode }}</p>

      <h1 class="panel-section-title mt-1">
        {{ isNotFound ? t('error.notFoundTitle') : t('error.genericTitle') }}
      </h1>

      <p class="panel-section-subtitle mx-auto mt-3 max-w-md">
        {{ isNotFound ? t('error.notFoundMessage') : t('error.genericMessage') }}
      </p>

      <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
        <GkButton variant="primary" @click="handleClear">
          <AppIcon name="home" :size="18" class="me-2" />
          {{ t('error.backToDashboard') }}
        </GkButton>
        <GkButton variant="secondary" @click="reloadNuxtApp()">
          <AppIcon name="refresh" :size="18" class="me-2" />
          {{ t('error.tryAgain') }}
        </GkButton>
      </div>

      <details v-if="showDebug" class="mt-8 text-start">
        <summary class="cursor-pointer text-sm font-medium text-[var(--gk-color-primary)]">
          {{ t('error.debugInfo') }}
        </summary>
        <pre
          class="mt-3 max-h-64 overflow-auto rounded-[var(--panel-radius-sm)] bg-[color-mix(in_srgb,var(--gk-color-border)_30%,transparent)] p-4 text-start font-mono text-xs"
        >{{ error.message }}{{ error.stack ? `\n\n${error.stack}` : '' }}</pre>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { NuxtError } from '#app'
import { GkButton } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'

const props = defineProps<{ error: NuxtError }>()

const { t } = useI18n()

const isNotFound = computed(() => props.error.statusCode === 404)
// Stack traces can leak internals — developers only.
const showDebug = computed(() => import.meta.dev && !!props.error.message)

const handleClear = () => clearError({ redirect: '/dashboard' })

useHead({
  title: () => `${props.error.statusCode} — God Panel`,
  meta: [{ name: 'robots', content: 'noindex, nofollow' }],
})
</script>

<style scoped>
.error-page {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  min-height: 100dvh;
  padding: 1.5rem;
}
</style>
