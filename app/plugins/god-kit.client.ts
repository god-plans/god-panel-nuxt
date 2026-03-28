import { watch } from 'vue'
import { createGkKit, useGkTheme } from 'god-kit/vue/config'
import { gkKitConfig } from '~/config/gk.config'
import { useSettingsStore } from '~/stores/settings'
import { applyGkPrimaryPreset } from '~/utils/gk-primary-presets'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createGkKit(gkKitConfig))

  const settings = useSettingsStore()
  const theme = useGkTheme()
  const colorMode = useColorMode()

  /**
   * Pinia `settings.colorScheme` is the single source of truth.
   * Keep `@nuxtjs/color-mode` and god-kit `useGkTheme()` aligned with it.
   */
  const applyScheme = () => {
    const cs = settings.settings.colorScheme
    theme.change(cs === 'dark' ? 'dark' : 'light')
    colorMode.preference = cs
  }

  const applyPrimary = () => {
    if (typeof document === 'undefined') return
    applyGkPrimaryPreset(document.documentElement, settings.settings.primaryColor)
  }

  applyScheme()
  applyPrimary()
  watch(() => settings.settings.colorScheme, applyScheme)
  watch(() => settings.settings.primaryColor, applyPrimary)
})
