import { watch } from 'vue'
import type { Composer } from 'vue-i18n'

/**
 * Restores the saved language *during SSR* and keeps `<html lang/dir>` in sync.
 *
 * Doing this in a plugin rather than in `app.vue` matters: `setLocale()` called
 * from a component's setup resolves too late to affect the server-rendered
 * HTML, so a Persian user would get an English first paint.
 */
export default defineNuxtPlugin({
  name: 'i18n-locale',
  dependsOn: ['i18n:plugin'],
  async setup(nuxtApp) {
    const i18n = nuxtApp.$i18n as Composer
    const saved = useCookie<string | null>('lang', { default: () => null, maxAge: 60 * 60 * 24 * 365 })

    const isSupported = (value: unknown): value is 'en' | 'fa' => value === 'en' || value === 'fa'

    if (isSupported(saved.value) && saved.value !== i18n.locale.value) {
      await i18n.setLocale(saved.value)
    } else if (!saved.value) {
      saved.value = i18n.locale.value
    }

    if (import.meta.server) return

    const settings = useSettingsStore()
    const syncRoot = () => {
      const root = document.documentElement
      root.setAttribute('lang', i18n.locale.value)
      root.setAttribute('dir', settings.settings.direction)
    }

    syncRoot()
    watch(
      () => [i18n.locale.value, settings.settings.direction] as const,
      ([locale]) => {
        saved.value = locale
        syncRoot()
      },
      { flush: 'post' }
    )
  },
})
