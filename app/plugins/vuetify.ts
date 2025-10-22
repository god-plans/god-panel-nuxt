import { watch, ref } from 'vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createTheme } from '~/theme/create-theme'

export default defineNuxtPlugin((nuxtApp) => {
  // Debounce utility function
  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout
    return (...args: any[]) => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => func.apply(null, args), delay)
    }
  }

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
        'on-surface-variant': palette.onSurfaceVariant || '#424242',
        'on-error': palette.error?.contrastText || '#ffffff',
        'outline': palette.outline || '#9e9e9e',
        'outline-variant': palette.outlineVariant || '#e0e0e0',
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
      // Modern theme configuration
      variations: {
        colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error'],
        lighten: 5,
        darken: 5,
      },
    },
    icons: {
      defaultSet: 'mdi',
      aliases,
      sets: { mdi },
    },
    // Modern design defaults
    defaults: {
      // Global component defaults for modern look
      VAppBar: {
        elevation: 0, // Remove shadows
        flat: true,
        height: 64,
      },
      VCard: {
        elevation: 0, // Remove shadows
        flat: true,
        rounded: 'lg', // Large border radius
        border: true,
      },
      VBtn: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
        variant: 'flat',
      },
      VTextField: {
        rounded: 'lg', // Large border radius
        variant: 'outlined',
        density: 'comfortable',
      },
      VSelect: {
        rounded: 'lg', // Large border radius
        variant: 'outlined',
        density: 'comfortable',
      },
      VChip: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
      },
      VSheet: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
      },
      VNavigationDrawer: {
        elevation: 0, // Remove shadows
        border: true,
      },
      VDialog: {
        rounded: 'xl', // Extra large border radius
        elevation: 0, // Remove shadows
      },
      VMenu: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
      },
      VTabs: {
        rounded: 'lg', // Large border radius
      },
      VExpansionPanels: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
      },
      VExpansionPanel: {
        rounded: 'lg', // Large border radius
      },
      VList: {
        rounded: 'lg', // Large border radius
      },
      VListItem: {
        rounded: 'lg', // Large border radius
      },
      VAvatar: {
        rounded: 'xl', // Extra large border radius
      },
      VBadge: {
        rounded: 'xl', // Extra large border radius
      },
      VProgressCircular: {
        rounded: 'xl', // Extra large border radius
      },
      VProgressLinear: {
        rounded: 'xl', // Extra large border radius
      },
      VSlider: {
        rounded: 'xl', // Extra large border radius
      },
      VSwitch: {
        rounded: 'xl', // Extra large border radius
      },
      VCheckbox: {
        rounded: 'xl', // Extra large border radius
      },
      VRadio: {
        rounded: 'xl', // Extra large border radius
      },
      VTable: {
        rounded: 'lg', // Large border radius
      },
      VDataTable: {
        rounded: 'lg', // Large border radius
      },
      VPagination: {
        rounded: 'lg', // Large border radius
      },
      VStepper: {
        rounded: 'lg', // Large border radius
      },
      VStepperHeader: {
        rounded: 'lg', // Large border radius
      },
      VStepperStep: {
        rounded: 'lg', // Large border radius
      },
      VTimeline: {
        rounded: 'lg', // Large border radius
      },
      VTimelineItem: {
        rounded: 'lg', // Large border radius
      },
      VAlert: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
        border: true,
      },
      VBanner: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
      },
      VBottomNavigation: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
      },
      VBottomSheet: {
        rounded: 'xl', // Extra large border radius
        elevation: 0, // Remove shadows
      },
      VSnackbar: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
      },
      VTooltip: {
        rounded: 'lg', // Large border radius
        elevation: 0, // Remove shadows
      },
      VOverlay: {
        rounded: 'lg', // Large border radius
      },
      // Form components
      VForm: {
        rounded: 'lg', // Large border radius
      },
      VAutocomplete: {
        rounded: 'lg', // Large border radius
        variant: 'outlined',
        density: 'comfortable',
      },
      VCombobox: {
        rounded: 'lg', // Large border radius
        variant: 'outlined',
        density: 'comfortable',
      },
      VTextarea: {
        rounded: 'lg', // Large border radius
        variant: 'outlined',
        density: 'comfortable',
      },
      VFileInput: {
        rounded: 'lg', // Large border radius
        variant: 'outlined',
        density: 'comfortable',
      },
      VRangeSlider: {
        rounded: 'xl', // Extra large border radius
      },
      VRating: {
        rounded: 'lg', // Large border radius
      },
    },
  })

  nuxtApp.vueApp.use(vuetify)

  // Debounced theme update function
  const updateTheme = debounce((newSettings: any) => {
    // Update theme name
    const themeName = newSettings.colorScheme
    vuetify.theme.global.name.value = themeName

    // Update both light and dark themes with new colors
    const lightTheme = convertThemeToVuetify({ ...newSettings, colorScheme: 'light' })
    const darkTheme = convertThemeToVuetify({ ...newSettings, colorScheme: 'dark' })

    // Update theme colors - more reliable approach
    if (vuetify.theme.themes.value.light) {
      Object.entries(lightTheme.colors).forEach(([key, value]) => {
        vuetify.theme.themes.value.light!.colors[key] = value
      })
      // Force theme update by setting the current theme again
      vuetify.theme.global.name.value = 'light'
    }

    if (vuetify.theme.themes.value.dark) {
      Object.entries(darkTheme.colors).forEach(([key, value]) => {
        vuetify.theme.themes.value.dark!.colors[key] = value
      })
      // Force theme update by setting the current theme again
      vuetify.theme.global.name.value = 'dark'
    }

    // Apply the current theme
    vuetify.theme.global.name.value = themeName

    // Update RTL setting
    vuetify.rtl = newSettings.direction === 'rtl'

    // Update document attributes
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', newSettings.direction)
      if (newSettings.fontFamily) {
        document.documentElement.style.setProperty('--v-theme-font-family', newSettings.fontFamily)
      }
    }
  }, 100)

  // Watch for settings changes and update theme dynamically
  if (process.client) {
    const settingsStore = useSettingsStore()
    watch(
      () => settingsStore.settings,
      updateTheme,
      { deep: true, immediate: true }
    )
  }

  return {
    provide: {
      vuetify
    }
  }
})

