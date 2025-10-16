import { defineStore } from 'pinia'
import { settingsSchema, type Settings } from '~/types/validation'

const defaultSettings: Settings = {
  colorScheme: 'light',
  direction: 'ltr',
  contrast: 'high',
  primaryColor: 'default',
  navLayout: 'vertical',
  navColor: 'integrate',
  compactLayout: true,
  fontFamily: 'Inter'
}

export const useSettingsStore = defineStore('settings', () => {
  // State
  const settings = ref<Settings>(defaultSettings)
  const openDrawer = ref(false)

  // Getters
  const isRtl = computed(() => settings.value.direction === 'rtl')
  const isMiniLayout = computed(() => settings.value.navLayout === 'mini')
  const isHorizontalLayout = computed(() => settings.value.navLayout === 'horizontal')
  const isVerticalLayout = computed(() => settings.value.navLayout === 'vertical')
  const canReset = computed(() => {
    return JSON.stringify(settings.value) !== JSON.stringify(defaultSettings)
  })

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

  // Drawer actions
  const onOpenDrawer = () => {
    openDrawer.value = true
  }

  const onCloseDrawer = () => {
    openDrawer.value = false
  }

  const onReset = () => {
    settings.value = { ...defaultSettings }
    saveToStorage()
  }

  // Initialize on store creation
  if (process.client) {
    initialize()
  }

  return {
    // State
    settings,
    openDrawer,
    // Getters
    isRtl,
    isMiniLayout,
    isHorizontalLayout,
    isVerticalLayout,
    canReset,
    // Actions
    initialize,
    updateSettings,
    updateField,
    resetSettings,
    onOpenDrawer,
    onCloseDrawer,
    onReset
  }
})
