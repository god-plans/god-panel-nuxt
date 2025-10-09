import { defineStore } from 'pinia'
import { settingsSchema, type Settings } from '~/types/validation'

const defaultSettings: Settings = {
  themeMode: 'light',
  themeDirection: 'ltr',
  themeColor: 'default',
  themeStretch: false,
  themeLayout: 'vertical',
  navLayout: 'vertical',
  navColor: 'integrate',
  compactLayout: false,
  fontFamily: 'Inter'
}

export const useSettingsStore = defineStore('settings', () => {
  // State
  const settings = ref<Settings>(defaultSettings)

  // Getters
  const isRtl = computed(() => settings.value.themeDirection === 'rtl')
  const isMiniLayout = computed(() => settings.value.themeLayout === 'mini')
  const isHorizontalLayout = computed(() => settings.value.themeLayout === 'horizontal')
  const isVerticalLayout = computed(() => settings.value.themeLayout === 'vertical')

  // Actions
  const initialize = () => {
    if (process.client) {
      const stored = localStorage.getItem('settings')
      if (stored) {
        try {
          const parsed = JSON.parse(stored)
          const validated = settingsSchema.parse(parsed)
          settings.value = { ...defaultSettings, ...validated }
        } catch (error) {
          console.warn('Invalid settings in localStorage, using defaults')
        }
      }
    }
  }

  const updateSettings = (newSettings: Partial<Settings>) => {
    settings.value = { ...settings.value, ...newSettings }
    saveToStorage()
  }

  const updateField = <K extends keyof Settings>(field: K, value: Settings[K]) => {
    settings.value[field] = value
    saveToStorage()
  }

  const resetSettings = () => {
    settings.value = { ...defaultSettings }
    saveToStorage()
  }

  const saveToStorage = () => {
    if (process.client) {
      localStorage.setItem('settings', JSON.stringify(settings.value))
    }
  }

  // Initialize on store creation
  if (process.client) {
    initialize()
  }

  return {
    // State
    settings,
    // Getters
    isRtl,
    isMiniLayout,
    isHorizontalLayout,
    isVerticalLayout,
    // Actions
    initialize,
    updateSettings,
    updateField,
    resetSettings
  }
})
