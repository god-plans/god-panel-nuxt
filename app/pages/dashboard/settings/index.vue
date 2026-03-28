<template>
  <div class="settings-page max-w-screen-lg mx-auto w-full">
      <div class="page-header">
        <h1 class="text-h4 mb-2">{{ t('pages.settings.title') }}</h1>
        <p class="text-body-1 opacity-80">
          {{ t('pages.settings.subtitle') }}
        </p>
      </div>

      <div class="settings-content grid grid-cols-1 md:grid-cols-2 gap-8">
        <ThemeSettings />

        <div class="rounded-xl border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-6">
          <h2 class="text-h6 mb-4 flex items-center gap-2 font-semibold">
            <AppIcon name="information" :size="22" />
            {{ t('pages.settings.aboutThemeSystem') }}
          </h2>

          <div class="info-section">
            <h4>{{ t('pages.settings.themeFeatures') }}</h4>
            <ul>
              <li>{{ t('pages.settings.lightDarkMode') }}</li>
              <li>{{ t('pages.settings.rtlLtrSupport') }}</li>
              <li>{{ t('pages.settings.primaryColors') }}</li>
              <li>{{ t('pages.settings.layoutOptions') }}</li>
              <li>{{ t('pages.settings.fontCustomization') }}</li>
              <li>{{ t('pages.settings.highContrast') }}</li>
            </ul>
          </div>

          <GkDivider class="my-4" />

          <div class="info-section">
            <h4>{{ t('pages.settings.colorPalette') }}</h4>
            <p>{{ t('pages.settings.colorPaletteDesc') }}</p>
          </div>

          <GkDivider class="my-4" />

          <div class="info-section">
            <h4>{{ t('pages.settings.typography') }}</h4>
            <p>{{ t('pages.settings.typographyDesc') }}</p>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { GkDivider } from 'god-kit/vue'
import ThemeSettings from '~/components/theme/ThemeSettings.vue'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

useHead({
  title: 'Settings - God Panel'
})
</script>

<style scoped>
.settings-page {
  padding: 24px 0;
}

.page-header {
  margin-bottom: 32px;
}

.info-section {
  margin-bottom: 16px;
}

.info-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: var(--gk-color-on-surface);
  margin-bottom: 8px;
}

.info-section ul {
  padding-left: 20px;
  color: var(--gk-color-on-surface-muted);
}

.info-section li {
  margin-bottom: 4px;
}

.info-section p {
  color: var(--gk-color-on-surface-muted);
  line-height: 1.6;
}
</style>
