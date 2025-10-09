import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VLayout, VAppBar, VMain, VNavigationDrawer } from 'vuetify/components'
import 'vuetify/styles'
import { createTheme } from '~/theme/create-theme'

export default defineNuxtPlugin((nuxtApp) => {
  // Get settings from the store
  const settingsStore = useSettingsStore()

  // Create theme using our theme system
  const theme = createTheme(settingsStore.settings)

  // Convert our color schemes to Vuetify format
  const convertColorScheme = (scheme) => {
    const palette = scheme.palette
    return {
      colors: {
        primary: palette.primary.main,
        secondary: palette.secondary.main,
        accent: palette.secondary.light,
        error: palette.error.main,
        info: palette.info.main,
        success: palette.success.main,
        warning: palette.warning.main,
        background: palette.background.default,
        surface: palette.background.paper,
        'on-primary': palette.primary.contrastText,
        'on-secondary': palette.secondary.contrastText,
        'on-background': palette.text.primary,
        'on-surface': palette.text.primary,
        'on-error': palette.error.contrastText,
      }
    }
  }

  const vuetify = createVuetify({
    components: {
      ...components,
      VLayout,
      VAppBar,
      VMain,
      VNavigationDrawer
    },
    directives,
    theme: {
      defaultTheme: settingsStore.settings.themeMode,
      themes: {
        light: convertColorScheme(theme.colorSchemes.light),
        dark: convertColorScheme(theme.colorSchemes.dark),
      },
      variations: {
        colors: ['primary', 'secondary', 'accent', 'error', 'info', 'success', 'warning'],
        lighten: 5,
        darken: 5,
      },
    },
    defaults: theme.components,
    rtl: settingsStore.settings.direction === 'rtl',
  })

  nuxtApp.vueApp.use(vuetify)
})
