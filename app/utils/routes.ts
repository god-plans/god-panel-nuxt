// Route paths configuration
// Similar to Next.js paths.js but adapted for Nuxt.js

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
} as const

export const paths = {
  faqs: '/faqs',
  minimalStore: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    amplify: {
      signIn: `${ROOTS.AUTH}/amplify/sign-in`,
      verify: `${ROOTS.AUTH}/amplify/verify`,
      signUp: `${ROOTS.AUTH}/amplify/sign-up`,
      updatePassword: `${ROOTS.AUTH}/amplify/update-password`,
      resetPassword: `${ROOTS.AUTH}/amplify/reset-password`,
    },
    jwt: {
      signIn: `${ROOTS.AUTH}/jwt/sign-in`,
      signUp: `${ROOTS.AUTH}/jwt/sign-up`,
    },
    firebase: {
      signIn: `${ROOTS.AUTH}/firebase/sign-in`,
      verify: `${ROOTS.AUTH}/firebase/verify`,
      signUp: `${ROOTS.AUTH}/firebase/sign-up`,
      resetPassword: `${ROOTS.AUTH}/firebase/reset-password`,
    },
    auth0: {
      signIn: `${ROOTS.AUTH}/auth0/sign-in`,
    },
    supabase: {
      signIn: `${ROOTS.AUTH}/supabase/sign-in`,
      verify: `${ROOTS.AUTH}/supabase/verify`,
      signUp: `${ROOTS.AUTH}/supabase/sign-up`,
      updatePassword: `${ROOTS.AUTH}/supabase/update-password`,
      resetPassword: `${ROOTS.AUTH}/supabase/reset-password`,
    },
  },
  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    two: `${ROOTS.DASHBOARD}/two`,
    three: `${ROOTS.DASHBOARD}/three`,
    group: {
      root: `${ROOTS.DASHBOARD}/group`,
      five: `${ROOTS.DASHBOARD}/group/five`,
      six: `${ROOTS.DASHBOARD}/group/six`,
    },
    // Additional routes for the Nuxt version
    analytics: `${ROOTS.DASHBOARD}/analytics`,
    settings: `${ROOTS.DASHBOARD}/settings`,
    profile: `${ROOTS.DASHBOARD}/profile`,
    notifications: `${ROOTS.DASHBOARD}/notifications`,
  },
} as const

// Type-safe route helper functions
export const getRoute = (path: string) => path

export const isActiveRoute = (currentPath: string, routePath: string) => {
  return currentPath === routePath || currentPath.startsWith(routePath + '/')
}

// Navigation items configuration
export interface NavItem {
  key: string
  title: string
  path: string
  icon: string
  badge?: string | number
  children?: NavItem[]
}

export const dashboardNavItems: NavItem[] = [
  {
    key: 'dashboard',
    title: 'Dashboard',
    path: paths.dashboard.root,
    icon: 'mdi-view-dashboard'
  },
  {
    key: 'analytics',
    title: 'Analytics',
    path: paths.dashboard.analytics,
    icon: 'mdi-chart-line'
  },
  {
    key: 'settings',
    title: 'Settings',
    path: paths.dashboard.settings,
    icon: 'mdi-cog'
  }
]

// Breadcrumb helper
export const generateBreadcrumbs = (currentPath: string): NavItem[] => {
  const breadcrumbs: NavItem[] = []
  const pathSegments = currentPath.split('/').filter(Boolean)

  let accumulatedPath = ''

  pathSegments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`

    // Find matching nav item
    const navItem = dashboardNavItems.find(item => item.path === accumulatedPath)

    if (navItem) {
      breadcrumbs.push({
        ...navItem,
        path: accumulatedPath
      })
    } else if (index === pathSegments.length - 1) {
      // Last segment - create a generic breadcrumb
      breadcrumbs.push({
        key: segment,
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        path: accumulatedPath,
        icon: 'mdi-circle-small'
      })
    }
  })

  return breadcrumbs
}
