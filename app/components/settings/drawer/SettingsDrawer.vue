<template>
  <GkNavigationDrawer
    v-model="settingsStore.openDrawer"
    :location="settingsStore.settings.direction === 'rtl' ? 'left' : 'right'"
    :width="360"
    class="settings-drawer"
    temporary
    aria-label="Settings panel"
  >
    <div class="settings-drawer__header">
      <div class="header-title">
        <AppIcon name="cog" :size="22" class="me-2" />
        {{ t('common.settingsTitle') }}
      </div>

      <div class="header-actions">
        <FullscreenButton />

        <GkTooltip :text="t('common.reset')">
          <template #activator="{ props: tip }">
            <GkButton
              v-bind="tip"
              variant="ghost"
              slim
              :class="settingsStore.canReset ? 'text-[var(--gk-color-danger)]' : ''"
              @click="handleReset"
            >
              <span class="relative inline-flex">
                <AppIcon name="restart" :size="20" />
                <span
                  v-if="settingsStore.canReset"
                  class="absolute -top-0.5 -end-0.5 h-2 w-2 rounded-full bg-[var(--gk-color-danger)]"
                />
              </span>
            </GkButton>
          </template>
        </GkTooltip>

        <GkTooltip :text="t('common.close')">
          <template #activator="{ props: tip }">
            <GkButton v-bind="tip" variant="ghost" slim @click="settingsStore.onCloseDrawer">
              <AppIcon name="close" :size="20" />
            </GkButton>
          </template>
        </GkTooltip>
      </div>
    </div>

    <div class="settings-drawer__scrollable">
      <div class="settings-drawer__content">
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

        <PresetsOptions
          v-if="!hidePresets"
          :value="settingsStore.settings.primaryColor"
          :options="[
            { name: t('common.default'), value: '#00A76F', key: 'default' },
            { name: t('common.cyan'), value: '#078DEE', key: 'cyan' },
            { name: t('common.purple'), value: '#7635dc', key: 'purple' },
            { name: t('common.blue'), value: '#0C68E9', key: 'blue' },
            { name: t('common.orange'), value: '#fda92d', key: 'orange' },
            { name: t('common.red'), value: '#FF3030', key: 'red' },
          ]"
          @click-option="handlePresetClick"
        />

        <FontOptions
          v-if="!hideFont"
          :value="settingsStore.settings.fontFamily"
          :options="fontOptions"
          @click-option="handleFontClick"
        />
      </div>
    </div>
  </GkNavigationDrawer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { GkButton, GkNavigationDrawer, GkTooltip } from 'god-kit/vue'
import { useSettingsStore } from '~/stores/settings'
import AppIcon from '~/components/ui/AppIcon.vue'
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

const handlePresetClick = (primaryColorKey: string) => {
  settingsStore.updateField('primaryColor', primaryColorKey as 'default' | 'purple' | 'cyan' | 'blue' | 'orange' | 'red')
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
  background: color-mix(in srgb, var(--gk-color-bg) 92%, transparent);
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
  color: var(--gk-color-on-surface);
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
  background: color-mix(in srgb, var(--gk-color-on-surface) 20%, transparent);
  border-radius: 3px;
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
