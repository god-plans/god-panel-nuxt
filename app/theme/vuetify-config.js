// ----------------------------------------------------------------------
// Vuetify Configuration
// ----------------------------------------------------------------------

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { createTheme } from './create-theme'

// ----------------------------------------------------------------------
// Icon Configuration
// ----------------------------------------------------------------------

const iconConfig = {
  defaultSet: 'mdi',
  aliases: {
    ...aliases,
    // Add custom icon aliases if needed
    logo: 'mdi-view-dashboard',
    home: 'mdi-home',
    user: 'mdi-account',
    settings: 'mdi-cog',
    logout: 'mdi-logout',
    menu: 'mdi-menu',
    close: 'mdi-close',
    search: 'mdi-magnify',
    notification: 'mdi-bell',
    message: 'mdi-message',
    calendar: 'mdi-calendar',
    file: 'mdi-file',
    image: 'mdi-image',
    video: 'mdi-video',
    audio: 'mdi-volume-high',
    download: 'mdi-download',
    upload: 'mdi-upload',
    edit: 'mdi-pencil',
    delete: 'mdi-delete',
    add: 'mdi-plus',
    remove: 'mdi-minus',
    check: 'mdi-check',
    arrowUp: 'mdi-chevron-up',
    arrowDown: 'mdi-chevron-down',
    arrowLeft: 'mdi-chevron-left',
    arrowRight: 'mdi-chevron-right',
  },
  sets: {
    mdi,
  },
}

// ----------------------------------------------------------------------
// Locale Configuration
// ----------------------------------------------------------------------

const localeConfig = {
  locale: 'en',
  fallback: 'en',
  messages: {},
}

// ----------------------------------------------------------------------
// Breakpoint Configuration
// ----------------------------------------------------------------------

const breakpointConfig = {
  mobileBreakpoint: 'md',
  thresholds: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
}

// ----------------------------------------------------------------------
// Animation Configuration
// ----------------------------------------------------------------------

const animationConfig = {
  disabled: false,
  threshold: 300,
}

// ----------------------------------------------------------------------
// Create Vuetify Instance Function
// ----------------------------------------------------------------------

export function createVuetifyInstance(settings) {
  // Create theme using our theme system
  const theme = createTheme(settings)

  // Convert color schemes to Vuetify format
  const convertColorScheme = (scheme) => {
    const palette = scheme.palette
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

  // Vuetify configuration object
  const vuetifyConfig = {
    // Components
    components: {
      ...components,
    },

    // Directives
    directives,

    // Theme configuration
    theme: {
      defaultTheme: settings.colorScheme || 'light',
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

    // Component defaults from our theme system
    defaults: theme.components,

    // Icons
    icons: iconConfig,

    // Locale
    locale: localeConfig,

    // Breakpoints
    breakpoint: breakpointConfig,

    // Animations
    animation: animationConfig,

    // RTL support
    rtl: settings.direction === 'rtl',

    // Display configuration
    display: {
      mobileBreakpoint: breakpointConfig.mobileBreakpoint,
      thresholds: breakpointConfig.thresholds,
    },
  }

  return createVuetify(vuetifyConfig)
}

// ----------------------------------------------------------------------
// Default export for easy importing
// ----------------------------------------------------------------------

export default {
  createVuetifyInstance,
  iconConfig,
  localeConfig,
  breakpointConfig,
  animationConfig,
}
