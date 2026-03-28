import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
  dashboardNavItems,
  isActiveRoute,
  type NavItem,
} from '~/utils/routes'

/** One shared map for desktop + mobile drawers */
const expandedGroups = ref<Record<string, boolean>>({})

/**
 * Shared nav list state: which groups are expanded follows active route (on navigation).
 */
export function useDashboardNavMenu() {
  const route = useRoute()

  function syncExpandedFromRoute() {
    const next: Record<string, boolean> = {}
    for (const item of dashboardNavItems) {
      if (item.children) {
        next[item.key] = item.children.some((child) =>
          isActiveRoute(route.path, child.path)
        )
      }
    }
    expandedGroups.value = next
  }

  onMounted(syncExpandedFromRoute)
  watch(() => route.path, syncExpandedFromRoute)

  function toggleGroup(key: string) {
    expandedGroups.value = {
      ...expandedGroups.value,
      [key]: !expandedGroups.value[key],
    }
  }

  function isItemActive(path: string) {
    return isActiveRoute(route.path, path)
  }

  return {
    navItems: dashboardNavItems as NavItem[],
    expandedGroups,
    toggleGroup,
    isItemActive,
  }
}
