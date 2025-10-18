<template>
  <v-card class="theme-settings" elevation="2">
    <v-card-title class="text-h6 mb-4">
      <v-icon class="me-2">mdi-palette</v-icon>
      {{ t('settings.general') }}
    </v-card-title>

    <v-card-text>
      <!-- Theme Mode -->
      <div class="setting-group">
        <label class="setting-label">{{ t('theme.themeMode') }}</label>
        <v-btn-toggle
          v-model="localSettings.colorScheme"
          mandatory
          class="theme-toggle"
        >
          <v-btn value="light" variant="outlined" size="small">
            <v-icon class="me-1">mdi-weather-sunny</v-icon>
            {{ t('settings.light') }}
          </v-btn>
          <v-btn value="dark" variant="outlined" size="small">
            <v-icon class="me-1">mdi-weather-night</v-icon>
            {{ t('settings.dark') }}
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Direction -->
      <div class="setting-group">
        <label class="setting-label">{{ t('theme.direction') }}</label>
        <v-btn-toggle
          v-model="localSettings.direction"
          mandatory
          class="direction-toggle"
        >
          <v-btn value="ltr" variant="outlined" size="small">
            LTR
          </v-btn>
          <v-btn value="rtl" variant="outlined" size="small">
            RTL
          </v-btn>
        </v-btn-toggle>
      </div>

      <!-- Primary Color -->
      <div class="setting-group">
        <label class="setting-label">{{ t('theme.primaryColor') }}</label>
        <div class="color-options">
          <v-btn
            v-for="(color, key) in primaryColors"
            :key="key"
            :value="key"
            variant="outlined"
            size="small"
            class="color-btn"
            :class="{ active: localSettings.primaryColor === key }"
            @click="localSettings.primaryColor = key"
          >
            <div
              class="color-swatch"
              :style="{ backgroundColor: `rgb(var(--v-theme-${key === 'default' ? 'primary' : key}))` }"
            ></div>
            {{ key.charAt(0).toUpperCase() + key.slice(1) }}
          </v-btn>
        </div>
      </div>

      <!-- Layout Options -->
      <div class="setting-group">
        <label class="setting-label">{{ t('theme.layout') }}</label>
        <v-select
          v-model="localSettings.navLayout"
          :items="layoutOptions"
          variant="outlined"
          density="compact"
          hide-details
        />
      </div>

      <!-- Font Family -->
      <div class="setting-group">
        <label class="setting-label">{{ t('theme.fontFamily') }}</label>
        <v-select
          v-model="localSettings.fontFamily"
          :items="fontOptions"
          variant="outlined"
          density="compact"
          hide-details
        />
      </div>

      <!-- Contrast Toggle -->
      <div class="setting-group">
        <v-switch
          v-model="isHighContrast"
          :label="t('settingsDrawer.highContrast')"
          color="primary"
          density="compact"
          hide-details
        />
      </div>

      <!-- Actions -->
      <div class="actions mt-6">
        <v-btn
          variant="outlined"
          @click="resetToDefaults"
          class="me-2"
        >
          {{ t('common.reset') }}
        </v-btn>
        <v-btn
          color="primary"
          @click="applySettings"
        >
          {{ t('common.save') }}
        </v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '~/stores/settings'

const { t } = useI18n()

const settingsStore = useSettingsStore()

// Local settings for preview
const localSettings = reactive({ ...settingsStore.settings })

// Primary color options
const primaryColors = computed(() => ({
  default: t('common.default'),
  cyan: t('common.cyan'),
  purple: t('common.purple'),
  blue: t('common.blue'),
  orange: t('common.orange'),
  red: t('common.red'),
}))

// High contrast computed property
const isHighContrast = computed({
  get: () => localSettings.contrast === 'high',
  set: (value: boolean) => {
    localSettings.contrast = value ? 'high' : 'default'
  }
})

// Layout options
const layoutOptions = ref([
  { title: 'Vertical', value: 'vertical' },
  { title: 'Horizontal', value: 'horizontal' },
  { title: 'Mini', value: 'mini' },
])

// Font options
const fontOptions = ref([
  { title: 'Inter', value: 'Inter' },
  { title: 'Roboto', value: 'Roboto' },
  { title: 'Poppins', value: 'Poppins' },
  { title: 'Barlow', value: 'Barlow' },
  { title: 'DM Sans', value: 'DM Sans' },
  { title: 'Nunito Sans', value: 'Nunito Sans' },
])

// Apply settings
const applySettings = () => {
  settingsStore.updateSettings(localSettings)
}

// Reset to defaults
const resetToDefaults = () => {
  settingsStore.resetSettings()
  Object.assign(localSettings, settingsStore.settings)
}

// Watch for external changes and sync
watch(() => settingsStore.settings, (newSettings) => {
  Object.assign(localSettings, newSettings)
}, { deep: true })
</script>

<style scoped>
.theme-settings {
  max-width: 400px;
}

.setting-group {
  margin-bottom: 24px;
}

.setting-label {
  display: block;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 8px;
  font-size: 14px;
}

.theme-toggle,
.direction-toggle {
  width: 100%;
}

.color-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
}

.color-btn {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
  min-height: 32px;
}

.color-swatch {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid rgb(var(--v-theme-surface-variant));
}

.color-btn.active {
  border-color: rgb(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-primary-rgb), 0.08);
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}

/* Responsive */
@media (max-width: 480px) {
  .theme-settings {
    max-width: 100%;
  }

  .color-options {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
