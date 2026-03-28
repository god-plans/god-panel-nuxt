import { watch } from 'vue'
import { createGkKit, useGkTheme } from 'god-kit/vue/config'
import { gkKitConfig } from '~/config/gk.config'
import { useSettingsStore } from '~/stores/settings'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(createGkKit(gkKitConfig))

  const settings = useSettingsStore()
  const theme = useGkTheme()

  const applyScheme = () => {
    const cs = settings.settings.colorScheme
    theme.change(cs === 'dark' ? 'dark' : 'light')
  }

  applyScheme()
  watch(() => settings.settings.colorScheme, applyScheme)
})
