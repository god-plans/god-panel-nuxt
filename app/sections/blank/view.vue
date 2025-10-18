<template>
  <DashboardContent max-width="xl">
    <div class="blank-section">
      <h4 class="text-h4 mb-4" :style="{ color: `rgb(var(--v-theme-on-surface))` }">
        {{ title }}
      </h4>

      <div class="theme-showcase">
        <!-- Color Palette Display -->
        <v-card class="mb-4" elevation="1">
          <v-card-title class="text-h6">{{ t('pages.blank.themeColors') }}</v-card-title>
          <v-card-text>
            <div class="color-grid">
              <div
                v-for="(color, key) in themeColors"
                :key="key"
                class="color-item"
                :style="{ backgroundColor: `rgb(var(--v-theme-${color}))` }"
              >
                <span class="color-label">{{ key }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Shadow Showcase -->
        <v-card class="mb-4" elevation="1">
          <v-card-title class="text-h6">{{ t('pages.blank.shadowSystem') }}</v-card-title>
          <v-card-text>
            <div class="shadow-showcase">
              <v-sheet
                v-for="i in 5"
                :key="i"
                :elevation="i"
                class="shadow-item"
                :style="{ boxShadow: `var(--v-shadow-${i * 4})` }"
              >
                Elevation {{ i * 4 }}
              </v-sheet>
            </div>
          </v-card-text>
        </v-card>

        <!-- Typography Showcase -->
        <v-card class="mb-4" elevation="1">
          <v-card-title class="text-h6">{{ t('pages.blank.typography') }}</v-card-title>
          <v-card-text>
            <div class="typography-showcase">
              <h1 style="font-family: var(--v-theme-font-family)">Heading 1</h1>
              <h2 style="font-family: var(--v-theme-font-family)">Heading 2</h2>
              <h3 style="font-family: var(--v-theme-font-family)">Heading 3</h3>
              <p style="font-family: var(--v-theme-font-family)">Body text with primary font</p>
            </div>
          </v-card-text>
        </v-card>
      </div>

      <v-sheet
        class="blank-placeholder mt-5"
        :height="320"
        :style="{
          border: `dashed 1px rgb(var(--v-theme-outline))`,
          backgroundColor: `rgb(var(--v-theme-surface))`,
          boxShadow: `var(--v-custom-shadows-card)`
        }"
      >
        <div class="placeholder-content">
          <v-icon size="48" :style="{ color: `rgb(var(--v-theme-on-surface-variant))` }">
            mdi-view-dashboard
          </v-icon>
          <p :style="{ color: `rgb(var(--v-theme-on-surface-variant))` }">
            {{ t('pages.blank.placeholder') }}
          </p>
        </div>
      </v-sheet>
    </div>
  </DashboardContent>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Blank'
})

// Theme colors for showcase
const themeColors = ref({
  primary: 'primary',
  secondary: 'secondary',
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
  surface: 'surface',
  'on-surface': 'on-surface',
})
</script>

<style scoped>
.blank-section {
  max-width: 100%;
}

.theme-showcase {
  margin-bottom: 2rem;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin-top: 16px;
}

.color-item {
  height: 80px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: var(--v-custom-shadows-z1);
}

.color-label {
  color: white;
  font-size: 12px;
  font-weight: 600;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  text-transform: capitalize;
}

.shadow-showcase {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.shadow-item {
  padding: 16px;
  border-radius: 8px;
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface));
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  min-width: 100px;
}

.typography-showcase {
  margin-top: 16px;
}

.typography-showcase h1,
.typography-showcase h2,
.typography-showcase h3 {
  margin: 8px 0;
  color: rgb(var(--v-theme-on-surface));
}

.typography-showcase p {
  margin: 8px 0;
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.6;
}

.blank-placeholder {
  width: 100%;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

.placeholder-content {
  text-align: center;
  z-index: 1;
}

.placeholder-content p {
  margin-top: 16px;
  font-size: 14px;
  opacity: 0.8;
}

/* Theme-aware card styling */
:deep(.v-card) {
  border-radius: 12px;
  box-shadow: var(--v-custom-shadows-card);
}

:deep(.v-card-title) {
  color: rgb(var(--v-theme-on-surface));
  font-weight: 600;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .color-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .shadow-showcase {
    justify-content: center;
  }

  .shadow-item {
    min-width: 80px;
    padding: 12px;
  }
}
</style>
