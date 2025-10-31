<template>
  <v-card class="theme-settings" elevation="0">
    <v-card-text>
      <!-- Theme Mode -->
      <div class="setting-section">
        <div class="section-header">
          <v-icon class="section-icon">mdi-theme-light-dark</v-icon>
          <div>
            <h4 class="section-title">{{ t('theme.themeMode') }}</h4>
            <p class="section-description">{{ t('theme.themeModeDesc') }}</p>
          </div>
        </div>
        <div class="section-content">
          <v-btn-toggle
            v-model="localSettings.colorScheme"
            mandatory
            class="theme-toggle"
            rounded="lg"
          >
            <v-btn
              value="light"
              variant="outlined"
              class="toggle-btn"
              :class="{ active: localSettings.colorScheme === 'light' }"
            >
              <v-icon class="me-2">mdi-weather-sunny</v-icon>
              <span class="btn-text">{{ t('settings.light') }}</span>
              <v-icon class="btn-icon" v-if="localSettings.colorScheme === 'light'">mdi-check</v-icon>
            </v-btn>
            <v-btn
              value="dark"
              variant="outlined"
              class="toggle-btn"
              :class="{ active: localSettings.colorScheme === 'dark' }"
            >
              <v-icon class="me-2">mdi-weather-night</v-icon>
              <span class="btn-text">{{ t('settings.dark') }}</span>
              <v-icon class="btn-icon" v-if="localSettings.colorScheme === 'dark'">mdi-check</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>

      <!-- Direction -->
      <div class="setting-section">
        <div class="section-header">
          <v-icon class="section-icon">mdi-format-textdirection-l-to-r</v-icon>
          <div>
            <h4 class="section-title">{{ t('theme.direction') }}</h4>
            <p class="section-description">{{ t('theme.directionDesc') }}</p>
          </div>
        </div>
        <div class="section-content">
          <v-btn-toggle
            v-model="localSettings.direction"
            mandatory
            class="direction-toggle"
            rounded="lg"
          >
            <v-btn
              value="ltr"
              variant="outlined"
              class="toggle-btn"
              :class="{ active: localSettings.direction === 'ltr' }"
            >
              <span class="btn-text">LTR</span>
              <v-icon class="btn-icon" v-if="localSettings.direction === 'ltr'">mdi-check</v-icon>
            </v-btn>
            <v-btn
              value="rtl"
              variant="outlined"
              class="toggle-btn"
              :class="{ active: localSettings.direction === 'rtl' }"
            >
              <span class="btn-text">RTL</span>
              <v-icon class="btn-icon" v-if="localSettings.direction === 'rtl'">mdi-check</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>
      </div>

      <!-- Primary Color -->
      <div class="setting-section">
        <div class="section-header">
          <v-icon class="section-icon">mdi-palette</v-icon>
          <div>
            <h4 class="section-title">{{ t('theme.primaryColor') }}</h4>
            <p class="section-description">{{ t('theme.primaryColorDesc') }}</p>
          </div>
        </div>
        <div class="section-content">
          <div class="color-grid">
            <v-btn
              v-for="(color, key) in primaryColors"
              :key="key"
              variant="outlined"
              class="color-btn"
              :class="{ active: localSettings.primaryColor === key }"
              @click="localSettings.primaryColor = key"
            >
              <div
                class="color-swatch-large"
                :style="{ backgroundColor: `rgb(var(--v-theme-${key === 'default' ? 'primary' : key}))` }"
              ></div>
              <span class="color-label">{{ key.charAt(0).toUpperCase() + key.slice(1) }}</span>
              <v-icon class="check-icon" v-if="localSettings.primaryColor === key">mdi-check</v-icon>
            </v-btn>
          </div>
        </div>
      </div>

      <!-- Layout Options -->
      <div class="setting-section">
        <div class="section-header">
          <v-icon class="section-icon">mdi-view-dashboard</v-icon>
          <div>
            <h4 class="section-title">{{ t('theme.layout') }}</h4>
            <p class="section-description">{{ t('theme.layoutDesc') }}</p>
          </div>
        </div>
        <div class="section-content">
          <v-select
            v-model="localSettings.navLayout"
            :items="layoutOptions"
            variant="outlined"
            density="comfortable"
            hide-details
            prepend-inner-icon="mdi-view-dashboard"
          />
        </div>
      </div>

      <!-- Font Family -->
      <div class="setting-section">
        <div class="section-header">
          <v-icon class="section-icon">mdi-format-font</v-icon>
          <div>
            <h4 class="section-title">{{ t('theme.fontFamily') }}</h4>
            <p class="section-description">{{ t('theme.fontFamilyDesc') }}</p>
          </div>
        </div>
        <div class="section-content">
          <v-select
            v-model="localSettings.fontFamily"
            :items="fontOptions"
            variant="outlined"
            density="comfortable"
            hide-details
            prepend-inner-icon="mdi-format-font"
          />
        </div>
      </div>

      <!-- Contrast Toggle -->
      <div class="setting-section">
        <div class="section-header">
          <v-icon class="section-icon">mdi-contrast</v-icon>
          <div>
            <h4 class="section-title">{{ t('settingsDrawer.highContrast') }}</h4>
            <p class="section-description">{{ t('theme.contrastDesc') }}</p>
          </div>
        </div>
        <div class="section-content">
          <v-switch
            v-model="isHighContrast"
            color="primary"
            density="comfortable"
            hide-details
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="actions-section">
        <v-divider class="mb-6" />
        <div class="actions">
          <v-btn
            variant="outlined"
            @click="resetToDefaults"
            class="action-btn"
          >
            <v-icon class="me-2">mdi-refresh</v-icon>
            {{ t('common.reset') }}
          </v-btn>
          <v-btn
            color="primary"
            @click="applySettings"
            class="action-btn primary"
          >
            <v-icon class="me-2">mdi-content-save</v-icon>
            {{ t('common.save') }}
          </v-btn>
        </div>
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
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.2);
  border-radius: 12px;
  overflow: hidden;
}

.setting-section {
  margin-bottom: 32px;
}

.setting-section:last-child {
  margin-bottom: 0;
}

.section-header {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 16px;
}

.section-icon {
  color: rgb(var(--v-theme-primary));
  margin-top: 2px;
  flex-shrink: 0;
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin: 0 0 4px 0;
}

.section-description {
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
  line-height: 1.4;
}

.section-content {
  margin-left: 36px;
}

.theme-toggle,
.direction-toggle {
  width: 100%;
  border-radius: 12px;
  overflow: hidden;
}

.toggle-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 0;
  position: relative;
  transition: all 0.2s ease;
}

.toggle-btn.active {
  background: rgba(var(--v-theme-primary), 0.1);
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-primary));
}

.toggle-btn:not(.active):hover {
  background: rgba(var(--v-theme-surface-variant), 0.5);
}

.btn-text {
  font-weight: 500;
}

.btn-icon {
  font-size: 16px;
}

.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.color-btn {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  min-height: 80px;
  border-radius: 12px;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.color-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.color-btn.active {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.05);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.2);
}

.color-swatch-large {
  width: 32px;
  height: 32px;
  border-radius: 8px;
  border: 3px solid rgb(var(--v-theme-surface));
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.color-label {
  font-size: 12px;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  text-align: center;
}

.check-icon {
  position: absolute;
  top: 8px;
  right: 8px;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.actions-section {
  margin-top: 32px;
}

.actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.action-btn {
  min-width: 120px;
  padding: 12px 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .section-content {
    margin-left: 0;
  }

  .section-header {
    flex-direction: column;
    gap: 8px;
  }

  .section-icon {
    align-self: flex-start;
  }

  .color-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .color-grid {
    grid-template-columns: 1fr;
  }

  .toggle-btn {
    padding: 10px 12px;
  }

  .btn-text {
    font-size: 14px;
  }
}
</style>
