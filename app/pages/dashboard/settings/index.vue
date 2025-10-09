<template>
  <DashboardContent max-width="lg">
    <div class="settings-page">
      <div class="page-header">
        <h1 class="text-h4 mb-2">Settings</h1>
        <p class="text-body-1 text-medium-emphasis">
          Customize your dashboard experience
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
                About Theme System
              </v-card-title>

              <v-card-text>
                <div class="info-section">
                  <h4>Theme Features</h4>
                  <ul>
                    <li>Light and Dark mode switching</li>
                    <li>RTL/LTR text direction support</li>
                    <li>6 different primary color schemes</li>
                    <li>Multiple layout options</li>
                    <li>Font family customization</li>
                    <li>High contrast mode</li>
                  </ul>
                </div>

                <v-divider class="my-4" />

                <div class="info-section">
                  <h4>Color Palette</h4>
                  <p>The theme system uses a comprehensive color palette with primary, secondary, and semantic colors (success, warning, error, info).</p>
                </div>

                <v-divider class="my-4" />

                <div class="info-section">
                  <h4>Typography</h4>
                  <p>Multiple font families and responsive typography scales ensure consistent and readable text across all devices.</p>
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
import ThemeSettings from '~/components/theme/ThemeSettings.vue'

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
