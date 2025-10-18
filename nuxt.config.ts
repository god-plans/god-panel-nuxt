// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  devServer: {
    port: 3333,
    host: '0.0.0.0'
  },

  // Modules
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/color-mode',
    '@nuxtjs/i18n'
  ],

  // Auto-imports for better DX
  imports: {
    autoImport: true
  },

  // Runtime config for API
  runtimeConfig: {
    public: {
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000',
      appName: 'God Panel',
      version: '1.0.0'
    }
  },

  // Color mode configuration
  colorMode: {
    preference: 'light',
    fallback: 'light',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  },

  // CSS
  css: [
    '~/assets/css/main.css',
    // Load MDI font for icons
    'vuetify/lib/styles/main.sass',
    '@mdi/font/css/materialdesignicons.min.css'
  ],

  // Build configuration
  build: {
    transpile: ['vuetify']
  },

  // SSR
  ssr: true,

  // TypeScript
  typescript: {
    strict: true,
    typeCheck: false // Disable during development for better performance
  },

  // i18n configuration
  // @ts-ignore
  i18n: {
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        dir: 'ltr'
      },
      {
        code: 'fa',
        name: 'فارسی',
        iso: 'fa-IR',
        dir: 'rtl'
      }
    ],
    defaultLocale: 'en',
    baseUrl: 'http://localhost:3000',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
      fallbackLocale: 'en'
    },
    strategy: 'no_prefix',
    vueI18n: './i18n.config.ts'
  }
})
