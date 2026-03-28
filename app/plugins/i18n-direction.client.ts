import { watch } from 'vue'
import type { Composer } from 'vue-i18n'

/**
 * Keeps `document.documentElement` `dir` / `lang` in sync with the settings store
 * and i18n locale (SEO, native controls). `#app` already mirrors `dir` in app.vue.
 *
 * `useI18n()` is only valid inside component setup — use `nuxtApp.$i18n` here.
 */
export default defineNuxtPlugin({
  name: 'i18n-direction',
  enforce: 'post',
  dependsOn: ['i18n:plugin'],
  setup(nuxtApp) {
    const i18n = nuxtApp.$i18n as Composer
    const locale = i18n.locale
    const settingsStore = useSettingsStore()

    const syncRoot = () => {
      const root = document.documentElement
      root.setAttribute('dir', settingsStore.settings.direction)
      root.setAttribute('lang', locale.value)
    }

    syncRoot()

    watch(
      () => [settingsStore.settings.direction, locale.value] as const,
      () => syncRoot(),
      { flush: 'post' }
    )
  },
})
