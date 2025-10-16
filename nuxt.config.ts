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
    '@nuxtjs/color-mode'
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
  css: ['~/assets/css/main.css'],

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
  }
})
