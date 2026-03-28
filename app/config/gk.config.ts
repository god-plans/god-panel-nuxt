import type { GkKitOptions } from 'god-kit/vue/config'

/**
 * God Kit global options. Theme / locale are synced at runtime from Pinia + vue-i18n
 * in {@link ~/plugins/god-kit.client}.
 */
export const gkKitConfig: GkKitOptions = {
  theme: {
    defaultTheme: 'light',
    scope: () =>
      typeof document !== 'undefined' ? document.documentElement : null,
  },
  display: {
    mobileBreakpoint: 'md',
  },
  locale: {
    locale: 'en',
    fallback: 'en',
    messages: {},
  },
  defaults: {
    GkButton: { variant: 'primary' },
  },
}
