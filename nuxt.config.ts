// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: { port: 3333 },

  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n',
    '@nuxt/icon',
  ],

  /**
   * Flat component names: `app/components/ui/StatCard.vue` is `<StatCard />`
   * anywhere, with no import line. Keep component filenames unique.
   */
  components: [{ path: '~/components', pathPrefix: false }],

  // god-kit tokens and component styles load before the app's Tailwind layers.
  css: [
    'god-kit/tokens.css',
    'god-kit/vue.css',
    '~/assets/css/panel-shell.css',
    '~/assets/css/dashboard-nav.css',
  ],

  /**
   * `main.css` holds the `@tailwind` directives. Naming it here stops the module
   * from also injecting its own default stylesheet — which would emit Tailwind twice.
   */
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },

  runtimeConfig: {
    public: {
      /** Base URL every `useApi()` request is sent to. */
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000',
      appName: 'God Panel',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || '',
      /** Set to `false` once a real backend is wired up — see `stores/auth.ts`. */
      demoMode: process.env.NUXT_PUBLIC_DEMO_MODE !== 'false',
      /** When set, `plugins/error-handler.client.ts` can forward to Sentry. */
      sentryDsn: process.env.NUXT_PUBLIC_SENTRY_DSN || '',
      godKitDocumentation:
        process.env.NUXT_PUBLIC_GOD_KIT_DOCS || 'https://godkit.godplans.org/',
    },
  },

  /**
   * The theme is driven by the `settings` store; color-mode only mirrors it so
   * Tailwind's `dark:` variant (class strategy, see tailwind.config.js) and
   * god-kit's `data-gk-theme` stay on the same value.
   */
  colorMode: {
    preference: 'light',
    fallback: 'light',
    classSuffix: '',
    storageKey: 'nuxt-color-mode',
  },

  i18n: {
    strategy: 'no_prefix',
    defaultLocale: 'en',
    detectBrowserLanguage: false,
    langDir: './locales/',
    locales: [
      { code: 'en', language: 'en-US', dir: 'ltr', files: ['en.json'] },
      { code: 'fa', language: 'fa-IR', dir: 'rtl', files: ['fa.json'] },
    ],
  },

  /**
   * Bundles icon JSON into the server build so SSR hosts without JSON import
   * support still resolve icons (see Nuxt Icon serverBundle docs).
   */
  icon: {
    serverBundle: { externalizeIconsJson: false },
  },

  app: {
    // Honours `prefers-reduced-motion` via `@media` in main.css.
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      titleTemplate: '%s',
      meta: [
        { name: 'description', content: 'God Panel — Nuxt 4 admin dashboard built on god-kit.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#6366f1' },
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/god-pure-dark.png' },
        { rel: 'apple-touch-icon', href: '/god-pure-dark.png' },
      ],
    },
  },

  nitro: {
    compressPublicAssets: true,
  },

  typescript: {
    strict: true,
    // `npm run typecheck` runs vue-tsc; keeping it out of dev keeps HMR fast.
    typeCheck: false,
  },
})
