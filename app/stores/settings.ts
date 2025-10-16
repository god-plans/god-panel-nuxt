import { defineStore } from 'pinia'
import { settingsSchema, type Settings } from '~/types/validation'
import { useCookie } from '#app'

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

  // Cookies for SSR support
  const settingsCookie = useCookie('settings', {
    default: () => defaultSettings,
    encode: JSON.stringify,
    decode: JSON.parse,
    maxAge: 60 * 60 * 24 * 365, // 1 year
  })

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
    // Always start with defaults
    settings.value = { ...defaultSettings }

    // Try to load from cookies first (works on both server and client)
    try {
      const cookieSettings = settingsCookie.value
      if (cookieSettings && typeof cookieSettings === 'object') {
        const validated = settingsSchema.parse(cookieSettings)
        settings.value = { ...defaultSettings, ...validated }
        return
      }
    } catch (error) {
      if (process.client) {
        console.warn('Invalid settings in cookie, trying localStorage')
      }
    }

    // Fallback to localStorage on client only
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
    // Save to cookies for SSR support
    settingsCookie.value = settings.value

    // Also save to localStorage on client for immediate persistence
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
  // Always initialize to ensure SSR compatibility
  initialize()

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
