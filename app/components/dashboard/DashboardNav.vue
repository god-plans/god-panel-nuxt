<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="!mobile"
    :temporary="mobile"
    :mini="mini && !mobile"
    :width="getNavWidth()"
    class="dashboard-nav"
    :class="{ 'nav-mini': mini && !mobile, 'nav-compact': settingsStore.settings.compactLayout }"
  >
    <!-- Mobile Header -->
    <div v-if="mobile" class="mobile-header">
      <v-btn
        icon
        @click="$emit('open-mobile')"
        class="mobile-menu-btn"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <span class="mobile-title">Menu</span>
    </div>

    <!-- Logo Section -->
    <div v-else class="nav-header">
      <v-img
        :src="mini ? '/logo-single.png' : '/logo-full.png'"
        :width="mini ? 40 : 120"
        class="logo"
        contain
      />
      <v-spacer v-if="!mini" />
      <v-btn
        icon
        @click="$emit('toggle-mini')"
        class="toggle-btn"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </div>

    <!-- Navigation Items -->
    <v-list class="nav-list" density="compact">
      <v-list-item
        v-for="item in navItems"
        :key="item.key"
        :to="item.path"
        :active="isActive(item.path)"
        class="nav-item"
        :class="{ 'nav-item-active': isActive(item.path) }"
      >
        <template #prepend>
          <v-icon :icon="item.icon" size="20" />
        </template>
        <v-list-item-title v-if="!mini || mobile" class="nav-title">
          {{ item.title }}
        </v-list-item-title>
        <template #append v-if="item.badge">
          <v-chip
            :text="item.badge"
            size="small"
            color="primary"
            variant="flat"
          />
        </template>
      </v-list-item>
    </v-list>

    <!-- Footer Section -->
    <template #append>
      <div class="nav-footer">
        <v-list density="compact">
          <v-list-item @click="handleLogout" class="nav-item">
            <template #prepend>
              <v-icon>mdi-logout</v-icon>
            </template>
            <v-list-item-title v-if="!mini || mobile">
              Logout
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface NavItem {
  key: string
  title: string
  path: string
  icon: string
  badge?: string | number
}

interface Props {
  mini?: boolean
  mobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mini: false,
  mobile: false
})

defineEmits<{
  'toggle-mini': []
  'open-mobile': []
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const settingsStore = useSettingsStore()

// Get navigation width based on settings
const getNavWidth = () => {
  if (props.mobile) return 300
  if (props.mini) return 88

  // Compact mode reduces width
  return settingsStore.settings.compactLayout ? 260 : 300
}

// Navigation drawer state for mobile
const drawer = ref(!props.mobile)

// Navigation items
const navItems = ref<NavItem[]>([
  {
    key: 'dashboard',
    title: 'Dashboard',
    path: '/dashboard',
    icon: 'mdi-view-dashboard'
  },
  {
    key: 'users',
    title: 'Users',
    path: '/dashboard/users',
    icon: 'mdi-account-group'
  },
  {
    key: 'products',
    title: 'Products',
    path: '/dashboard/products',
    icon: 'mdi-package-variant'
  },
  {
    key: 'orders',
    title: 'Orders',
    path: '/dashboard/orders',
    icon: 'mdi-shopping-cart'
  },
  {
    key: 'analytics',
    title: 'Analytics',
    path: '/dashboard/analytics',
    icon: 'mdi-chart-line'
  },
  {
    key: 'settings',
    title: 'Settings',
    path: '/dashboard/settings',
    icon: 'mdi-cog'
  }
])

// Check if navigation item is active
const isActive = (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
}

// Handle logout
const handleLogout = async () => {
  await authStore.logout()
  await router.push('/auth/login')
}
</script>

<style scoped>
.dashboard-nav {
  border-right: 1px solid rgb(var(--v-theme-surface-variant));
  background: rgb(var(--v-theme-surface));
}

.nav-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
  min-height: 64px;
}

.logo {
  transition: all 0.3s ease;
}

.toggle-btn {
  margin-left: 8px;
}

.nav-list {
  padding: 8px 0;
}

.nav-item {
  margin: 2px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
}

.nav-item:hover {
  background: rgba(var(--v-theme-on-surface-rgb), 0.08);
}

.nav-item-active {
  background: rgba(var(--v-theme-primary-rgb), 0.12);
  color: rgb(var(--v-theme-primary));
  box-shadow: var(--v-custom-shadows-z1);
}

.nav-item-active:hover {
  background: rgba(var(--v-theme-primary-rgb), 0.16);
}

.nav-item-active .v-icon {
  color: rgb(var(--v-theme-primary)) !important;
}

.nav-title {
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-footer {
  border-top: 1px solid rgb(var(--v-theme-surface-variant));
  padding: 8px 0;
}

/* Mini mode styles */
.nav-mini .nav-header {
  justify-content: center;
}

.nav-mini .toggle-btn {
  display: none;
}

.nav-mini .nav-item {
  margin: 2px 4px;
  justify-content: center;
}

.nav-mini .nav-title {
  display: none;
}

/* Mobile header styles */
.mobile-header {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
}

.mobile-menu-btn {
  margin-right: 12px;
}

.mobile-title {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

/* Compact mode styles */
.nav-compact .nav-header {
  padding: 12px 16px;
}

.nav-compact .nav-item {
  margin: 2px 8px;
  padding: 8px 12px;
  min-height: 44px;
}

.nav-compact .nav-title {
  font-size: 0.8rem;
}

.nav-compact .logo {
  width: 100px !important;
}

/* Mobile styles */
@media (max-width: 768px) {
  .dashboard-nav {
    position: absolute;
    z-index: 1000;
  }
}
</style>
