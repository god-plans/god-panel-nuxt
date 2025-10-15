<template>
  <v-navigation-drawer
    v-model="settingsStore.openDrawer"
    location="right"
    width="360"
    class="settings-drawer"
    temporary
  >
    <!-- Header -->
    <div class="settings-drawer__header">
      <div class="header-title">
        <v-icon class="me-2">mdi-cog</v-icon>
        Settings
      </div>

      <div class="header-actions">
        <FullscreenButton />

        <v-tooltip text="Reset">
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

        <v-tooltip text="Close">
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
            label="Dark mode"
            :selected="settingsStore.settings.colorScheme === 'dark'"
            @click="toggleColorScheme"
          />

          <BaseOption
            v-if="!hideContrast"
            icon="contrast"
            label="Contrast"
            :selected="settingsStore.settings.contrast === 'hight'"
            @click="toggleContrast"
          />

          <BaseOption
            v-if="!hideDirection"
            icon="align-right"
            label="Right to left"
            :selected="settingsStore.settings.direction === 'rtl'"
            @click="toggleDirection"
          />

          <BaseOption
            v-if="!hideCompact"
            tooltip="Dashboard only and available at large resolutions > 1600px (xl)"
            icon="autofit-width"
            label="Compact"
            :selected="settingsStore.settings.compactLayout"
            @click="toggleCompactLayout"
          />
        </div>

        <!-- Navigation Options -->
        <NavOptions
          v-if="!(hideNavLayout && hideNavColor)"
          :value="{
            color: settingsStore.settings.navColor,
            layout: settingsStore.settings.navLayout
          }"
          :options="{
            colors: ['integrate', 'apparent'],
            layouts: ['vertical', 'horizontal', 'mini']
          }"
          :hide-nav-color="hideNavColor"
          :hide-nav-layout="hideNavLayout"
          @click-option="handleNavOptionClick"
        />

        <!-- Presets -->
        <PresetsOptions
          v-if="!hidePresets"
          :value="settingsStore.settings.primaryColor"
          :options="[
            { name: 'default', value: '#00A76F' },
            { name: 'cyan', value: '#078DEE' },
            { name: 'purple', value: '#7635dc' },
            { name: 'blue', value: '#0C68E9' },
            { name: 'orange', value: '#fda92d' },
            { name: 'red', value: '#FF3030' },
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
import { useSettingsStore } from '~/stores/settings'
import BaseOption from './BaseOption.vue'
import FullscreenButton from './FullscreenButton.vue'
import NavOptions from './NavOptions.vue'
import PresetsOptions from './PresetsOptions.vue'
import FontOptions from './FontOptions.vue'

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
  const newContrast = settingsStore.settings.contrast === 'default' ? 'hight' : 'default'
  settingsStore.updateField('contrast', newContrast)
}

const toggleDirection = () => {
  const newDirection = settingsStore.settings.direction === 'ltr' ? 'rtl' : 'ltr'
  settingsStore.updateField('direction', newDirection)
}

const toggleCompactLayout = () => {
  settingsStore.updateField('compactLayout', !settingsStore.settings.compactLayout)
}

const handleNavOptionClick = (option: { color?: string; layout?: string }) => {
  if (option.color) {
    settingsStore.updateField('navColor', option.color as 'integrate' | 'apparent')
  }
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
