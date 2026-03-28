<template>
  <div class="theme-settings panel-card p-6">
    <h2 class="text-h6 mb-4 flex items-center gap-2 font-semibold">
      <AppIcon name="palette" :size="22" />
      {{ t('settings.general') }}
    </h2>

    <div class="space-y-6">
      <div class="setting-group">
        <label class="setting-label">{{ t('theme.themeMode') }}</label>
        <div class="flex flex-wrap gap-2">
          <GkButton
            :variant="localSettings.colorScheme === 'light' ? 'primary' : 'secondary'"
            size="sm"
            @click="localSettings.colorScheme = 'light'"
          >
            <AppIcon name="weather-sunny" :size="16" class="me-1" />
            {{ t('settings.light') }}
          </GkButton>
          <GkButton
            :variant="localSettings.colorScheme === 'dark' ? 'primary' : 'secondary'"
            size="sm"
            @click="localSettings.colorScheme = 'dark'"
          >
            <AppIcon name="weather-night" :size="16" class="me-1" />
            {{ t('settings.dark') }}
          </GkButton>
        </div>
      </div>

      <div class="setting-group">
        <label class="setting-label">{{ t('theme.direction') }}</label>
        <div class="flex flex-wrap gap-2">
          <GkButton
            :variant="localSettings.direction === 'ltr' ? 'primary' : 'secondary'"
            size="sm"
            @click="localSettings.direction = 'ltr'"
          >
            LTR
          </GkButton>
          <GkButton
            :variant="localSettings.direction === 'rtl' ? 'primary' : 'secondary'"
            size="sm"
            @click="localSettings.direction = 'rtl'"
          >
            RTL
          </GkButton>
        </div>
      </div>

      <div class="setting-group">
        <label class="setting-label">{{ t('theme.primaryColor') }}</label>
        <div class="color-options">
          <GkButton
            v-for="(label, key) in primaryColors"
            :key="key"
            variant="secondary"
            size="sm"
            class="color-btn"
            :class="{ active: localSettings.primaryColor === key }"
            @click="onPrimaryColor(key as 'default' | 'purple' | 'cyan' | 'blue' | 'orange' | 'red')"
          >
            <span
              class="color-swatch inline-block rounded-full border-2 border-[var(--gk-color-border)]"
              :style="{ backgroundColor: swatchColor(key as string) }"
            />
            {{ label }}
          </GkButton>
        </div>
      </div>

      <GkField :label="t('theme.layout')">
        <GkSelect
          v-model="localSettings.navLayout"
          :options="layoutSelectOptions"
        />
      </GkField>

      <GkField :label="t('theme.fontFamily')">
        <GkSelect
          v-model="localSettings.fontFamily"
          :options="fontSelectOptions"
        />
      </GkField>

      <div class="setting-group">
        <label class="flex items-center gap-2 cursor-pointer">
          <GkCheckbox v-model="isHighContrast" :aria-label="t('settingsDrawer.highContrast')" />
          <span>{{ t('settingsDrawer.highContrast') }}</span>
        </label>
      </div>

      <div class="actions mt-6 flex flex-wrap justify-end gap-2">
        <GkButton variant="secondary" @click="resetToDefaults">
          {{ t('common.reset') }}
        </GkButton>
        <GkButton variant="primary" @click="applySettings">
          {{ t('common.save') }}
        </GkButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { GkButton, GkCheckbox, GkField, GkSelect } from 'god-kit/vue'
import { useSettingsStore } from '~/stores/settings'
import { applyGkPrimaryPreset } from '~/utils/gk-primary-presets'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()

const settingsStore = useSettingsStore()

const localSettings = reactive({ ...settingsStore.settings })

const primaryColors = computed(() => ({
  default: t('common.default'),
  cyan: t('common.cyan'),
  purple: t('common.purple'),
  blue: t('common.blue'),
  orange: t('common.orange'),
  red: t('common.red'),
}))

const swatchColors: Record<string, string> = {
  default: 'var(--gk-color-primary)',
  cyan: '#06b6d4',
  purple: '#7635dc',
  blue: '#0C68E9',
  orange: '#fda92d',
  red: '#FF3030',
}

function swatchColor(key: string) {
  return swatchColors[key] ?? 'var(--gk-color-primary)'
}

function onPrimaryColor(key: 'default' | 'purple' | 'cyan' | 'blue' | 'orange' | 'red') {
  localSettings.primaryColor = key
}

const isHighContrast = computed({
  get: () => localSettings.contrast === 'high',
  set: (value: boolean) => {
    localSettings.contrast = value ? 'high' : 'default'
  }
})

const layoutSelectOptions = [
  { value: 'vertical', label: 'Vertical' },
  { value: 'horizontal', label: 'Horizontal' },
  { value: 'mini', label: 'Mini' },
]

const fontSelectOptions = [
  { value: 'Inter', label: 'Inter' },
  { value: 'Roboto', label: 'Roboto' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Barlow', label: 'Barlow' },
  { value: 'DM Sans', label: 'DM Sans' },
  { value: 'Nunito Sans', label: 'Nunito Sans' },
]

const applySettings = () => {
  settingsStore.updateSettings(localSettings)
}

const resetToDefaults = () => {
  settingsStore.resetSettings()
  Object.assign(localSettings, settingsStore.settings)
}

watch(() => settingsStore.settings, (newSettings) => {
  Object.assign(localSettings, newSettings)
}, { deep: true })

/** Live preview: sidebar / buttons use --gk-color-primary before Save */
watch(
  () => localSettings.primaryColor,
  (preset) => {
    if (import.meta.client) {
      applyGkPrimaryPreset(document.documentElement, preset)
    }
  },
  { immediate: true }
)

onUnmounted(() => {
  if (import.meta.client) {
    applyGkPrimaryPreset(document.documentElement, settingsStore.settings.primaryColor)
  }
})
</script>

<style scoped>
.theme-settings {
  width: 100%;
  max-width: none;
}

.setting-group {
  margin-bottom: 24px;
}

.setting-label {
  display: block;
  font-weight: 600;
  color: var(--gk-color-on-surface);
  margin-bottom: 8px;
  font-size: 14px;
}

.color-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(80px, 1fr));
  gap: 8px;
}

.color-swatch {
  width: 16px;
  height: 16px;
}

.color-btn.active {
  outline: 2px solid var(--gk-color-primary);
}

@media (max-width: 480px) {
  .theme-settings {
    max-width: 100%;
  }

  .color-options {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
