import { watch } from 'vue'

export default defineNuxtPlugin(() => {
  const { $i18n } = useNuxtApp()

  // Set initial direction and language on client side
  const setDirection = (locale: string) => {
    if (process.client) {
      const html = document.documentElement
      html.setAttribute('dir', locale === 'fa' ? 'rtl' : 'ltr')
      html.setAttribute('lang', locale)

      // Also update settings store direction
      const settingsStore = useSettingsStore()
      const direction = locale === 'fa' ? 'rtl' : 'ltr'
      settingsStore.updateField('direction', direction)
    }
  }

  // Set initial direction
  setDirection($i18n.locale.value)

  // Watch for locale changes using Vue's watch
  watch($i18n.locale, (newLocale) => {
    setDirection(newLocale)
  })
})
