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

  // App configuration
  app: {
    head: {
      title: 'Gods Projects - Divine Innovation',
      meta: [
        { name: 'description', content: 'Modern dashboard built with divine innovation and cutting-edge technology.' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'theme-color', content: '#6366f1' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/logo-gods-projects-professional-icon.svg' },
        { rel: 'apple-touch-icon', href: '/logo-gods-projects-professional-icon.svg' }
      ]
    }
  },

})
