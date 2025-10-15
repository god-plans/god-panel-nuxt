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
    <v-card-text class="settings-drawer__content">
      <v-row class="mb-6">
        <!-- Color Scheme -->
        <v-col v-if="!hideColorScheme" cols="6">
          <BaseOption
            icon="moon"
            label="Dark mode"
            :selected="settingsStore.settings.colorScheme === 'dark'"
            @click="toggleColorScheme"
          />
        </v-col>

        <!-- Contrast -->
        <v-col v-if="!hideContrast" cols="6">
          <BaseOption
            icon="contrast"
            label="Contrast"
            :selected="settingsStore.settings.contrast === 'hight'"
            @click="toggleContrast"
          />
        </v-col>

        <!-- Direction -->
        <v-col v-if="!hideDirection" cols="6">
          <BaseOption
            icon="align-right"
            label="Right to left"
            :selected="settingsStore.settings.direction === 'rtl'"
            @click="toggleDirection"
          />
        </v-col>

        <!-- Compact Layout -->
        <v-col v-if="!hideCompact" cols="6">
          <BaseOption
            tooltip="Dashboard only and available at large resolutions > 1600px (xl)"
            icon="autofit-width"
            label="Compact"
            :selected="settingsStore.settings.compactLayout"
            @click="toggleCompactLayout"
          />
        </v-col>
      </v-row>

      <!-- Navigation Options -->
      <div v-if="!(hideNavLayout && hideNavColor)" class="mb-6">
        <NavOptions
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
      </div>

      <!-- Presets -->
      <div v-if="!hidePresets" class="mb-6">
        <PresetsOptions
          :value="settingsStore.settings.primaryColor"
          @click-option="handlePresetClick"
        />
      </div>

      <!-- Font Options -->
      <div v-if="!hideFont">
        <FontOptions
          :value="settingsStore.settings.fontFamily"
          :options="fontOptions"
          @click-option="handleFontClick"
        />
      </div>
    </v-card-text>
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
  background: rgb(var(--v-theme-surface));
}

.settings-drawer__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 16px 16px 24px;
  border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
  min-height: 64px;
}

.header-title {
  display: flex;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.settings-drawer__content {
  padding: 24px 16px 32px 16px;
  height: calc(100vh - 64px);
  overflow-y: auto;
}
</style>
