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

// Helper function to check if a nav item or its children are active
const isItemActive = (item: NavItem, currentPath: string): boolean => {
  // Check if current item is active
  if (currentPath === item.path || currentPath.startsWith(item.path + '/')) {
    return true
  }

  // Check if any children are active
  if (item.children) {
    return item.children.some(child => isItemActive(child, currentPath))
  }

  return false
}

export const isActiveRoute = (currentPath: string, routePath: string) => {
  // First check direct match or starts with
  if (currentPath === routePath || currentPath.startsWith(routePath + '/')) {
    return true
  }

  // For parent items with children, check if any child is active
  const parentItem = dashboardNavItems.find(item =>
    item.children && item.children.some(child =>
      currentPath === child.path || currentPath.startsWith(child.path + '/')
    )
  )

  return parentItem?.path === routePath
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
    title: 'common.dashboard',
    path: paths.dashboard.root,
    icon: 'mdi-view-dashboard'
  },
  {
    key: 'analytics',
    title: 'common.analytics',
    path: paths.dashboard.analytics,
    icon: 'mdi-chart-line'
  },
  {
    key: 'group',
    title: 'common.group',
    path: paths.dashboard.group.root,
    icon: 'mdi-folder-multiple',
    children: [
      {
        key: 'group-five',
        title: 'common.five',
        path: paths.dashboard.group.five,
        icon: 'mdi-numeric-5-circle'
      },
      {
        key: 'group-six',
        title: 'common.six',
        path: paths.dashboard.group.six,
        icon: 'mdi-numeric-6-circle'
      }
    ]
  },
  {
    key: 'settings',
    title: 'common.settings',
    path: paths.dashboard.settings,
    icon: 'mdi-cog'
  }
]

// Route name mappings for breadcrumbs
const routeTranslations: Record<string, string> = {
  'dashboard': 'routes.dashboard',
  'analytics': 'routes.analytics',
  'settings': 'routes.settings',
  'profile': 'routes.profile',
  'notifications': 'routes.notifications',
  'group': 'routes.group',
  'five': 'routes.five',
  'six': 'routes.six'
}

// Helper function to find nav item recursively
const findNavItem = (items: NavItem[], path: string): NavItem | null => {
  for (const item of items) {
    if (item.path === path) {
      return item
    }
    if (item.children) {
      const found = findNavItem(item.children, path)
      if (found) return found
    }
  }
  return null
}

// Breadcrumb helper
export const generateBreadcrumbs = (currentPath: string): NavItem[] => {
  const breadcrumbs: NavItem[] = []
  const pathSegments = currentPath.split('/').filter(Boolean)

  let accumulatedPath = ''

  pathSegments.forEach((segment, index) => {
    accumulatedPath += `/${segment}`

    // Find matching nav item (including in children)
    const navItem = findNavItem(dashboardNavItems, accumulatedPath)

    if (navItem) {
      breadcrumbs.push({
        ...navItem,
        path: accumulatedPath
      })
    } else {
      // Check if this segment has a translation key
      const translationKey = routeTranslations[segment]
      const title = translationKey ? translationKey : segment.charAt(0).toUpperCase() + segment.slice(1)

      breadcrumbs.push({
        key: segment,
        title: title,
        path: accumulatedPath,
        icon: 'mdi-circle-small'
      })
    }
  })

  return breadcrumbs
}
