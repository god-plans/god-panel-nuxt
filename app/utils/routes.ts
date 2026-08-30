/**
 * Every route and sidebar entry in one place.
 *
 * To add a page: create the file under `app/pages/`, add its path to `paths`,
 * then add an entry to `dashboardNavItems`. `title` is an i18n key — add the
 * matching string to `i18n/locales/en.json` and `fa.json`.
 */

export const paths = {
  auth: {
    login: '/auth/login',
    register: '/auth/register',
    forgotPassword: '/auth/forgot-password',
  },
  dashboard: {
    root: '/dashboard',
    analytics: '/dashboard/analytics',
    settings: '/dashboard/settings',
    profile: '/dashboard/profile',
    notifications: '/dashboard/notifications',
    group: {
      root: '/dashboard/group',
      one: '/dashboard/group/one',
      two: '/dashboard/group/two',
    },
  },
} as const

export interface NavItem {
  key: string
  /** i18n key, e.g. `common.dashboard`. */
  title: string
  /** Internal path, or an `https://` URL to open in a new tab. */
  path: string
  /** `AppIcon` name — see `app/utils/app-icon-resolve.ts`. */
  icon: string
  badge?: string | number
  children?: NavItem[]
}

export const dashboardNavItems: NavItem[] = [
  {
    key: 'dashboard',
    title: 'common.dashboard',
    path: paths.dashboard.root,
    icon: 'view-dashboard',
  },
  {
    key: 'analytics',
    title: 'common.analytics',
    path: paths.dashboard.analytics,
    icon: 'chart-line',
  },
  {
    key: 'group',
    title: 'common.group',
    path: paths.dashboard.group.root,
    icon: 'folder-multiple',
    children: [
      { key: 'group-one', title: 'common.one', path: paths.dashboard.group.one, icon: 'numeric-5-circle' },
      { key: 'group-two', title: 'common.two', path: paths.dashboard.group.two, icon: 'numeric-6-circle' },
    ],
  },
  {
    key: 'settings',
    title: 'common.settings',
    path: paths.dashboard.settings,
    icon: 'cog',
  },
  {
    key: 'god-kit-docs',
    title: 'common.godKitDocs',
    path: 'https://godkit.godplans.org/',
    icon: 'book-open-variant',
  },
]

function isUnder(currentPath: string, path: string): boolean {
  return currentPath === path || currentPath.startsWith(`${path}/`)
}

/** Every nav path, parents and children alike. */
function allNavPaths(items: NavItem[]): string[] {
  return items.flatMap((item) => [item.path, ...allNavPaths(item.children ?? [])])
}

/**
 * True when `routePath` is the nav entry that best matches the current page.
 *
 * The "best" qualifier is what keeps `/dashboard` from lighting up alongside
 * `/dashboard/analytics` — every dashboard route starts with `/dashboard`, so a
 * plain prefix test would mark the overview active on every single page.
 */
export function isActiveRoute(currentPath: string, routePath: string): boolean {
  if (!isUnder(currentPath, routePath)) return false

  const bestMatch = allNavPaths(dashboardNavItems)
    .filter((path) => isUnder(currentPath, path))
    .reduce((longest, path) => (path.length > longest.length ? path : longest), '')

  if (routePath === bestMatch) return true

  // A parent also stays highlighted while one of its own children is the match.
  const parent = dashboardNavItems.find((item) => item.path === routePath)
  return !!parent?.children?.some((child) => isUnder(currentPath, child.path))
}

/** i18n keys for path segments that are not themselves nav items. */
const SEGMENT_TITLES: Record<string, string> = {
  dashboard: 'routes.dashboard',
  analytics: 'routes.analytics',
  settings: 'routes.settings',
  profile: 'routes.profile',
  notifications: 'routes.notifications',
  group: 'routes.group',
  one: 'routes.one',
  two: 'routes.two',
}

function findNavItem(items: NavItem[], path: string): NavItem | undefined {
  for (const item of items) {
    if (item.path === path) return item
    const child = item.children && findNavItem(item.children, path)
    if (child) return child
  }
}

export function generateBreadcrumbs(currentPath: string): Array<{ title: string; path: string }> {
  let accumulated = ''

  return currentPath
    .split('/')
    .filter(Boolean)
    .map((segment) => {
      accumulated += `/${segment}`
      const navItem = findNavItem(dashboardNavItems, accumulated)

      return {
        path: accumulated,
        title:
          navItem?.title ??
          SEGMENT_TITLES[segment] ??
          segment.charAt(0).toUpperCase() + segment.slice(1),
      }
    })
}
