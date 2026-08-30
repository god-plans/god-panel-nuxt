import { defineStore } from 'pinia'
import { partialSettingsSchema, type Settings } from '~/types/validation'

/** Change these to re-brand the panel's out-of-the-box look. */
export const defaultSettings: Settings = {
  colorScheme: 'light',
  direction: 'ltr',
  contrast: 'high',
  primaryColor: 'default',
  navLayout: 'vertical',
  compactLayout: true,
  fontFamily: 'Inter',
  iconStyle: 'linear',
}

export const useSettingsStore = defineStore('settings', () => {
  /**
   * Persisted in a cookie rather than `localStorage` so the server renders the
   * user's theme on first paint — no flash of the default light theme.
   */
  const cookie = useCookie<Partial<Settings>>('settings', {
    default: () => ({ ...defaultSettings }),
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
  })

  const settings = ref<Settings>(readCookie())
  const drawerOpen = ref(false)

  /** Unknown or stale keys degrade to defaults instead of wiping the theme. */
  function readCookie(): Settings {
    const parsed = partialSettingsSchema.safeParse(cookie.value)
    return { ...defaultSettings, ...(parsed.success ? parsed.data : {}) }
  }

  const isRtl = computed(() => settings.value.direction === 'rtl')
  const isDark = computed(() => settings.value.colorScheme === 'dark')
  const isMiniLayout = computed(() => settings.value.navLayout === 'mini')
  const isHorizontalLayout = computed(() => settings.value.navLayout === 'horizontal')
  const canReset = computed(
    () => JSON.stringify(settings.value) !== JSON.stringify(defaultSettings)
  )

  function persist() {
    cookie.value = { ...settings.value }
  }

  function update(patch: Partial<Settings>) {
    settings.value = { ...settings.value, ...patch }
    persist()
  }

  function updateField<K extends keyof Settings>(field: K, value: Settings[K]) {
    update({ [field]: value } as Partial<Settings>)
  }

  function reset() {
    settings.value = { ...defaultSettings }
    persist()
  }

  return {
    settings,
    drawerOpen,
    isRtl,
    isDark,
    isMiniLayout,
    isHorizontalLayout,
    canReset,
    update,
    updateField,
    reset,
    openDrawer: () => (drawerOpen.value = true),
    closeDrawer: () => (drawerOpen.value = false),
  }
})
