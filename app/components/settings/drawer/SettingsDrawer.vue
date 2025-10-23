<template>
  <v-navigation-drawer
    v-model="settingsStore.openDrawer"
    :location="settingsStore.settings.direction === 'rtl' ? 'left' : 'right'"
    width="360"
    class="settings-drawer"
    temporary
    aria-label="Settings panel"
    role="dialog"
    aria-modal="true"
  >
    <!-- Header -->
    <div class="settings-drawer__header">
      <div class="header-title">
        <v-icon class="me-2">mdi-cog</v-icon>
        {{ t('common.settingsTitle') }}
      </div>

      <div class="header-actions">
        <FullscreenButton />

        <v-tooltip :text="t('common.reset')">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              size="small"
              variant="text"
              :color="settingsStore.canReset ? 'error' : 'default'"
              @click="handleReset"
            >
              <v-icon>mdi-restart</v-icon>
              <v-badge
                v-if="settingsStore.canReset"
                color="error"
                dot
                location="top end"
              />
            </v-btn>
          </template>
        </v-tooltip>

        <v-tooltip :text="t('common.close')">
          <template #activator="{ props }">
            <v-btn
              v-bind="props"
              icon
              size="small"
              variant="text"
              @click="settingsStore.onCloseDrawer"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </template>
        </v-tooltip>
      </div>
    </div>

    <!-- Content -->
    <div class="settings-drawer__scrollable">
      <div class="settings-drawer__content">
        <!-- Base Options Grid -->
        <div class="settings-drawer__grid">
          <BaseOption
            v-if="!hideColorScheme"
            icon="moon"
            :label="t('common.darkMode')"
            :tooltip="t('common.toggleDarkMode')"
            :selected="settingsStore.settings.colorScheme === 'dark'"
            @click="toggleColorScheme"
          />

          <BaseOption
            v-if="!hideContrast"
            icon="contrast"
            :label="t('common.highContrast')"
            :tooltip="t('common.highContrastTooltip')"
            :selected="settingsStore.settings.contrast === 'high'"
            @click="toggleContrast"
          />

          <BaseOption
            v-if="!hideDirection"
            icon="align-right"
            :label="t('common.rtl')"
            :tooltip="t('common.rtlTooltip')"
            :selected="settingsStore.settings.direction === 'rtl'"
            @click="toggleDirection"
          />

          <BaseOption
            v-if="!hideCompact"
            :tooltip="t('common.compactTooltip')"
            icon="autofit-width"
            :label="t('common.compact')"
            :selected="settingsStore.settings.compactLayout"
            @click="toggleCompactLayout"
          />
        </div>

        <!-- Navigation Options -->
        <NavOptions
          v-if="!(hideNavLayout && hideNavColor)"
          :value="{
            layout: settingsStore.settings.navLayout
          }"
          :options="{
            layouts: ['vertical', 'horizontal', 'mini']
          }"
          :hide-nav-color="true"
          :hide-nav-layout="hideNavLayout"
          @click-option="handleNavOptionClick"
        />

        <!-- Presets -->
        <PresetsOptions
          v-if="!hidePresets"
          :value="settingsStore.settings.primaryColor"
          :options="[
            { name: t('common.default'), value: '#00A76F' },
            { name: t('common.cyan'), value: '#078DEE' },
            { name: t('common.purple'), value: '#7635dc' },
            { name: t('common.blue'), value: '#0C68E9' },
            { name: t('common.orange'), value: '#fda92d' },
            { name: t('common.red'), value: '#FF3030' },
          ]"
          @click-option="handlePresetClick"
        />

        <!-- Font Options -->
        <FontOptions
          v-if="!hideFont"
          :value="settingsStore.settings.fontFamily"
          :options="fontOptions"
          @click-option="handleFontClick"
        />
      </div>
    </div>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '~/stores/settings'
import BaseOption from './BaseOption.vue'
import FullscreenButton from './FullscreenButton.vue'
import NavOptions from './NavOptions.vue'
import PresetsOptions from './PresetsOptions.vue'
import FontOptions from './FontOptions.vue'

const { t } = useI18n()

interface Props {
  hideFont?: boolean
  hideCompact?: boolean
  hidePresets?: boolean
  hideNavColor?: boolean
  hideContrast?: boolean
  hideNavLayout?: boolean
  hideDirection?: boolean
  hideColorScheme?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  hideFont: false,
  hideCompact: false,
  hidePresets: false,
  hideNavColor: false,
  hideContrast: false,
  hideNavLayout: false,
  hideDirection: false,
  hideColorScheme: false
})

const settingsStore = useSettingsStore()

const fontOptions = [
  'Inter',
  'Roboto',
  'Poppins',
  'Barlow',
  'DM Sans',
  'Nunito Sans'
]

const toggleColorScheme = () => {
  const newScheme = settingsStore.settings.colorScheme === 'light' ? 'dark' : 'light'
  settingsStore.updateField('colorScheme', newScheme)
}

const toggleContrast = () => {
  const newContrast = settingsStore.settings.contrast === 'default' ? 'high' : 'default'
  settingsStore.updateField('contrast', newContrast)
}

const toggleDirection = () => {
  const newDirection = settingsStore.settings.direction === 'ltr' ? 'rtl' : 'ltr'
  settingsStore.updateField('direction', newDirection)
}

const toggleCompactLayout = () => {
  settingsStore.updateField('compactLayout', !settingsStore.settings.compactLayout)
}

const handleNavOptionClick = (option: { layout?: string }) => {
  if (option.layout) {
    settingsStore.updateField('navLayout', option.layout as 'vertical' | 'horizontal' | 'mini')
  }
}

const handlePresetClick = (value: string) => {
  settingsStore.updateField('primaryColor', value as 'default' | 'purple' | 'cyan' | 'blue' | 'orange' | 'red')
}

const handleFontClick = (value: string) => {
  settingsStore.updateField('fontFamily', value as 'Barlow' | 'Inter' | 'Roboto' | 'Poppins' | 'DM Sans' | 'Nunito Sans')
}

const handleReset = () => {
  settingsStore.onReset()
}
</script>

<style scoped>
.settings-drawer {
  background: rgba(var(--v-theme-background), 0.9);
  backdrop-filter: blur(20px);
}

.settings-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 8px 16px 20px;
  min-height: 64px;
}

.header-title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  flex-grow: 1;
  color: rgb(var(--v-theme-on-surface));
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.settings-drawer__scrollable {
  height: calc(100vh - 64px);
  overflow-y: auto;
  overflow-x: hidden;
}

.settings-drawer__scrollable::-webkit-scrollbar {
  width: 6px;
}

.settings-drawer__scrollable::-webkit-scrollbar-track {
  background: transparent;
}

.settings-drawer__scrollable::-webkit-scrollbar-thumb {
  background: rgba(var(--v-theme-on-surface), 0.2);
  border-radius: 3px;
}

.settings-drawer__scrollable::-webkit-scrollbar-thumb:hover {
  background: rgba(var(--v-theme-on-surface), 0.3);
}

.settings-drawer__content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 48px;
}

.settings-drawer__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}
</style>
