<template>
  <v-navigation-drawer
    v-model="drawer"
    :permanent="!mobile"
    :temporary="mobile"
    :mini="mini && !mobile"
    :width="getNavWidth()"
    :location="settingsStore.settings.direction === 'rtl' ? 'right' : 'left'"
    class="dashboard-nav"
    :class="{
      'nav-mini': mini && !mobile,
      'nav-compact': settingsStore.settings.compactLayout,
      'nav-rtl': settingsStore.settings.direction === 'rtl'
    }"
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
      <span class="mobile-title">{{ t('common.menu') }}</span>
    </div>

    <!-- Logo Section -->
    <div v-else class="nav-header">
      <Logo
        :variant="mini ? 'icon' : 'compact'"
        :size="mini ? 'sm' : 'md'"
        class="logo"
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
      <div v-for="item in navItems" :key="item.key">
        <!-- Main Navigation Item -->
        <v-list-item
          v-if="!item.children"
          :to="item.path"
          
          class="nav-item"
          :class="{ 'nav-item-active': isActive(item.path) }"
        >
          <template v-if="mini && !mobile" #default>
            <v-icon size="20">{{ item.icon }}</v-icon>
          </template>
          <template v-else #prepend>
            <v-icon size="20">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title v-if="!mini || mobile" class="nav-title">
            {{ t(item.title) }}
          </v-list-item-title>
          <template #append v-if="item.badge && (!mini || mobile)">
            <v-chip
              :text="item.badge"
              size="small"
              color="primary"
              variant="flat"
            />
          </template>
        </v-list-item>

        <!-- Collapsible Navigation Group -->
        <div v-else class="nav-group">
          <v-list-item
            class="nav-group-header"
            :class="{ 'nav-group-active': isActive(item.path), 'nav-group-expanded': expandedGroups[item.key] }"
            @click="toggleGroup(item.key)"
          >
            <template v-if="mini && !mobile" #default>
              <v-icon size="20">{{ item.icon }}</v-icon>
            </template>
            <template v-else #prepend>
              <v-icon size="20">{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title v-if="!mini || mobile" class="nav-title">
              {{ t(item.title) }}
            </v-list-item-title>
            <template #append v-if="!mini || mobile">
              <v-icon
                size="16"
                class="expand-icon"
                :class="{ 'expanded': expandedGroups[item.key] }"
              >
                mdi-chevron-down
              </v-icon>
            </template>
          </v-list-item>

          <!-- Sub Navigation Items -->
          <v-list
            v-if="expandedGroups[item.key] && (!mini || mobile)"
            class="nav-sublist"
            density="compact"
          >
            <v-list-item
              v-for="child in item.children"
              :key="child.key"
              :to="child.path"
             
              class="nav-subitem"
              :class="{ 'nav-subitem-active': isActive(child.path) }"
            >
              <template #prepend>
                <v-icon size="16">{{ child.icon }}</v-icon>
              </template>
              <v-list-item-title class="nav-subtitle">
                {{ t(child.title) }}
              </v-list-item-title>
              <template #append v-if="child.badge">
                <v-chip
                  :text="child.badge"
                  size="small"
                  color="primary"
                  variant="flat"
                />
              </template>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-list>

    <!-- Footer Section -->
    <template #append>
      <div class="nav-footer">

      </div>
    </template>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { dashboardNavItems, isActiveRoute, type NavItem } from '../../utils/routes'
import { useAuthStore } from '../../stores/auth'
import { useSettingsStore } from '../../stores/settings'
import Logo from '../common/Logo.vue'

const { t } = useI18n()

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

// Navigation items from centralized config
const navItems = ref(dashboardNavItems)

// Expanded groups state
const expandedGroups = ref<Record<string, boolean>>({})

// Initialize expanded groups based on active route
const initializeExpandedGroups = () => {
  navItems.value.forEach(item => {
    if (item.children) {
      // Expand group if any child is active
      const hasActiveChild = item.children.some(child => isActiveRoute(route.path, child.path))
      expandedGroups.value[item.key] = hasActiveChild
    }
  })
}

// Toggle group expansion
const toggleGroup = (key: string) => {
  expandedGroups.value[key] = !expandedGroups.value[key]
}

// Check if navigation item is active (computed for reactivity)
const isActive = computed(() => (path: string) => {
  return isActiveRoute(route.path, path)
})

// Watch for route changes to auto-expand relevant groups
watchEffect(() => {
  initializeExpandedGroups()
})


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
  padding: 12px;
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

/* Navigation Groups */
.nav-group {
  position: relative;
}

.nav-group-header {
  margin: 2px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  cursor: pointer;
}

.nav-group-header:hover {
  background: rgba(var(--v-theme-on-surface-rgb), 0.08);
}

.nav-group-active {
  background: rgba(var(--v-theme-primary-rgb), 0.12);
  color: rgb(var(--v-theme-primary));
  box-shadow: var(--v-custom-shadows-z1);
}

.nav-group-active:hover {
  background: rgba(var(--v-theme-primary-rgb), 0.16);
}

.nav-group-expanded {
  background: rgba(var(--v-theme-on-surface-rgb), 0.04);
}

.expand-icon {
  transition: transform 0.2s ease;
  opacity: 0.6;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

/* Sub Navigation */
.nav-sublist {
  padding-left: 16px;
  padding-right: 8px;
  margin-top: 4px;
  margin-bottom: 8px;
}

.nav-subitem {
  margin: 1px 0;
  border-radius: 6px;
  min-height: 36px;
  padding-left: 12px;
  padding-right: 12px;
  transition: all 0.2s ease;
}

.nav-subitem:hover {
  background: rgba(var(--v-theme-on-surface-rgb), 0.06);
}

.nav-subitem-active {
  background: rgba(var(--v-theme-primary-rgb), 0.10);
  color: rgb(var(--v-theme-primary));
  box-shadow: var(--v-custom-shadows-z1);
}

.nav-subitem-active:hover {
  background: rgba(var(--v-theme-primary-rgb), 0.14);
}

.nav-subitem-active .v-icon {
  color: rgb(var(--v-theme-primary)) !important;
}

.nav-subtitle {
  font-size: 0.85rem;
  font-weight: 500;
  opacity: 0.9;
}

/* Mini mode groups */
.nav-mini .nav-group-header {
  margin: 2px 4px;
  justify-content: center;
  padding: 12px;
}

.nav-mini .nav-sublist {
  display: none;
}

/* Compact mode groups */
.nav-compact .nav-sublist {
  padding-left: 12px;
}

.nav-compact .nav-subitem {
  min-height: 32px;
  padding-left: 8px;
  padding-right: 8px;
}



/* Mobile styles */
@media (max-width: 768px) {
  .dashboard-nav {
    position: absolute;
    z-index: 1000;
  }
}
</style>
