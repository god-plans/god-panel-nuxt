import { watch } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createTheme } from '~/theme/create-theme'

export default defineNuxtPlugin((nuxtApp) => {
  // Helper function to convert theme to Vuetify format
  const convertThemeToVuetify = (settings: any) => {
    const theme = createTheme(settings)
    const isDark = settings.colorScheme === 'dark'
    const palette = theme.colorSchemes[isDark ? 'dark' : 'light'].palette

    return {
      colors: {
        primary: palette.primary?.main || '#1976d2',
        secondary: palette.secondary?.main || '#424242',
        accent: palette.secondary?.light || '#757575',
        error: palette.error?.main || '#f44336',
        info: palette.info?.main || '#2196f3',
        success: palette.success?.main || '#4caf50',
        warning: palette.warning?.main || '#ff9800',
        background: palette.background?.default || '#ffffff',
        surface: palette.background?.paper || '#ffffff',
        'surface-variant': palette.surfaceVariant || '#f5f5f5',
        'on-primary': palette.primary?.contrastText || '#ffffff',
        'on-secondary': palette.secondary?.contrastText || '#ffffff',
        'on-background': palette.text?.primary || '#212121',
        'on-surface': palette.text?.primary || '#212121',
        'on-surface-variant': palette.text?.secondary || '#424242',
        'on-error': palette.error?.contrastText || '#ffffff',
        'outline': palette.divider || '#e0e0e0',
        'outline-variant': palette.divider || '#e0e0e0',
      }
    }
  }

  // Default settings for SSR - matches Settings type exactly
  const defaultSettings = {
    colorScheme: 'light',
    direction: 'ltr',
    contrast: 'default',
    primaryColor: 'default',
    navLayout: 'vertical',
    navColor: 'integrate',
    compactLayout: false,
    fontFamily: 'Inter'
  }

  // Create Vuetify instance
  const vuetify = createVuetify({
    components,
    directives,
    rtl: defaultSettings.direction === 'rtl', // Enable RTL support
    theme: {
      defaultTheme: defaultSettings.colorScheme,
      themes: {
        light: convertThemeToVuetify({ ...defaultSettings, colorScheme: 'light' }),
        dark: convertThemeToVuetify({ ...defaultSettings, colorScheme: 'dark' }),
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
  })

  nuxtApp.vueApp.use(vuetify)

  // Watch for settings changes and update theme dynamically
  if (process.client) {
    const settingsStore = useSettingsStore()
    watch(
      () => settingsStore.settings,
      (newSettings) => {
        // Update theme name
        const themeName = newSettings.colorScheme
        vuetify.theme.global.name.value = themeName

        // Update both light and dark themes with new colors
        const lightTheme = convertThemeToVuetify({ ...newSettings, colorScheme: 'light' })
        const darkTheme = convertThemeToVuetify({ ...newSettings, colorScheme: 'dark' })

        // Update theme colors
        if (vuetify.theme.themes.value.light) {
          Object.entries(lightTheme.colors).forEach(([key, value]) => {
            vuetify.theme.themes.value.light!.colors[key] = value
          })
        }

        if (vuetify.theme.themes.value.dark) {
          Object.entries(darkTheme.colors).forEach(([key, value]) => {
            vuetify.theme.themes.value.dark!.colors[key] = value
          })
        }

        // Update RTL setting
        vuetify.rtl = newSettings.direction === 'rtl'

        // Update document attributes
        if (typeof document !== 'undefined') {
          document.documentElement.setAttribute('dir', newSettings.direction)
          if (newSettings.fontFamily) {
            document.documentElement.style.setProperty('--v-theme-font-family', newSettings.fontFamily)
          }
        }
      },
      { deep: true, immediate: true }
    )
  }

  return {
    provide: {
      vuetify
    }
  }
})

