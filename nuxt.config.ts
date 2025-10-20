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
      apiUrl: process.env.NUXT_PUBLIC_API_URL || 'http://localhost:4000',
      appName: 'God Panel',
      version: '1.0.0',
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL,
      enableMockData: process.env.ENABLE_MOCK_DATA === 'true',
    },
    private: {
      jwtSecret: process.env.JWT_SECRET,
      refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY || '7d',
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

  // Nitro configuration for better performance
  nitro: {
    compressPublicAssets: true,
    minify: true,
    experimental: {
      wasm: true
    }
  },

  // Vite configuration for optimization
  vite: {
    optimizeDeps: {
      include: ['vue', 'vue-router', 'pinia', '@vueuse/core']
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['vue', 'vue-router'],
            ui: ['vuetify', '@mdi/js'],
            utils: ['axios', 'zod', 'clsx']
          }
        }
      }
    }
  },

  // Experimental features
  experimental: {
    payloadExtraction: false,
    viewTransition: true
  },

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
