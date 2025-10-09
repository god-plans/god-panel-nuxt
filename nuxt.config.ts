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
    '@nuxtjs/tailwindcss',
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
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
      apiUrl: process.env.API_BASE_URL || 'http://localhost:3001',
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

  // CSS - Import in global styles instead
  // css: ['~/assets/css/main.css'],

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
