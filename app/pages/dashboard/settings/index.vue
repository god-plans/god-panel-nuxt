<template>
  <div class="settings-page w-full">
      <div class="page-header">
        <h1 class="panel-section-title mb-2">{{ t('pages.settings.title') }}</h1>
        <p class="panel-section-subtitle">
          {{ t('pages.settings.subtitle') }}
        </p>
      </div>

      <div class="settings-content grid w-full grid-cols-1 gap-8 md:grid-cols-2 md:items-start">
        <ThemeSettings />

        <div class="panel-card p-6">
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
              <li>{{ t('pages.settings.solarIconStyle') }}</li>
            </ul>
          </div>

          <GkDivider class="my-4" />

          <div class="info-section">
            <h4>{{ t('pages.settings.resources') }}</h4>
            <p>
              {{ t('pages.settings.godKitDocsBlurb') }}
              <a
                :href="config.public.godKitDocumentation"
                class="settings-docs-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ t('pages.settings.godKitDocsLink') }}
              </a>
            </p>
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
const config = useRuntimeConfig()

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

.settings-docs-link {
  color: var(--gk-color-primary);
  font-weight: 600;
  text-decoration: underline;
  text-underline-offset: 2px;
}

.settings-docs-link:hover {
  color: color-mix(in srgb, var(--gk-color-primary) 85%, var(--gk-color-on-surface));
}
</style>
