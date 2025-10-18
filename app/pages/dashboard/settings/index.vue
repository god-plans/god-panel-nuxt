<template>
  <DashboardContent max-width="lg">
    <div class="settings-page">
      <div class="page-header">
        <h1 class="text-h4 mb-2">{{ t('pages.settings.title') }}</h1>
        <p class="text-body-1 text-medium-emphasis">
          {{ t('pages.settings.subtitle') }}
        </p>
      </div>

      <div class="settings-content">
        <v-row>
          <v-col cols="12" md="6">
            <ThemeSettings />
          </v-col>

          <v-col cols="12" md="6">
            <v-card elevation="2">
              <v-card-title class="text-h6 mb-4">
                <v-icon class="me-2">mdi-information</v-icon>
                {{ t('pages.settings.aboutThemeSystem') }}
              </v-card-title>

              <v-card-text>
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

                <v-divider class="my-4" />

                <div class="info-section">
                  <h4>{{ t('pages.settings.colorPalette') }}</h4>
                  <p>{{ t('pages.settings.colorPaletteDesc') }}</p>
                </div>

                <v-divider class="my-4" />

                <div class="info-section">
                  <h4>{{ t('pages.settings.typography') }}</h4>
                  <p>{{ t('pages.settings.typographyDesc') }}</p>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </div>
    </div>
  </DashboardContent>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ThemeSettings from '~/components/theme/ThemeSettings.vue'

const { t } = useI18n()

// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
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

.settings-content {
  max-width: 100%;
}

.info-section {
  margin-bottom: 16px;
}

.info-section h4 {
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 8px;
}

.info-section ul {
  padding-left: 20px;
  color: rgb(var(--v-theme-on-surface-variant));
}

.info-section li {
  margin-bottom: 4px;
}

.info-section p {
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.6;
}
</style>
