import { createI18n } from 'vue-i18n'
import { watch } from 'vue'
import en from '../locales/en.json'
import fa from '../locales/fa.json'

export default defineNuxtPlugin((nuxtApp) => {
  // Get current locale from cookie or default to 'en'
  const locale = useCookie('locale', { default: () => 'en' }).value

  // Create i18n instance
  const i18n = createI18n({
    legacy: false,
    locale: locale as 'en' | 'fa',
    messages: {
      en,
      fa
    }
  })

  // Provide i18n to the app
  nuxtApp.vueApp.use(i18n)

  // Set initial direction and language on client side
  const setDirection = (currentLocale: string) => {
    if (process.client) {
      const html = document.documentElement
      html.setAttribute('dir', currentLocale === 'fa' ? 'rtl' : 'ltr')
      html.setAttribute('lang', currentLocale)

      // Also update settings store direction
      const settingsStore = useSettingsStore()
      const direction = currentLocale === 'fa' ? 'rtl' : 'ltr'
      settingsStore.updateField('direction', direction)
    }
  }

  // Set initial direction
  setDirection(locale)

  // Watch for locale changes using Vue's watch
  watch(i18n.global.locale, (newLocale) => {
    setDirection(newLocale)
  })

  // Make i18n available globally
  return {
    provide: {
      i18n: i18n.global
    }
  }
})
