<template>
  <v-navigation-drawer
    :model-value="open"
    @update:model-value="$emit('update:open', $event)"
    temporary
    :location="settingsStore.settings.direction === 'rtl' ? 'right' : 'left'"
    class="mobile-nav"
    :class="{
      'nav-rtl': settingsStore.settings.direction === 'rtl'
    }"
    aria-label="Mobile navigation menu"
    role="navigation"
  >
    <!-- Header -->
    <div class="nav-header">
      <Logo
        variant="compact"
        size="md"
        class="logo"
      />
    </div>

    <!-- User Info -->
    <div class="user-info">
      <v-avatar size="48" class="user-avatar">
        <img :src="authStore.user?.photoURL || '/assets/images/avatar.webp'" :alt="authStore.displayName" />
      </v-avatar>
      <div class="user-details">
        <div class="user-name">{{ authStore.displayName || 'Demo User' }}</div>
        <div class="user-role">{{ authStore.userRole || 'User' }}</div>
      </div>
    </div>

    <!-- Navigation Items -->
    <v-list class="nav-list" density="compact">
      <div v-for="item in navItems" :key="item.key">
        <!-- Main Navigation Item -->
        <v-list-item
          v-if="!item.children"
          :to="item.path"
          :active="isActive(item.path)"
          class="nav-item"
          :class="{ 'nav-item-active': isActive(item.path) }"
          :aria-label="t(item.title)"
          @click="close"
        >
          <template v-if="settingsStore.settings.direction === 'rtl'" #append>
            <v-icon size="20">{{ item.icon }}</v-icon>
          </template>
          <template v-else #prepend>
            <v-icon size="20">{{ item.icon }}</v-icon>
          </template>
          <v-list-item-title class="nav-title" :class="{ 'text-right': settingsStore.settings.direction === 'rtl' }">
            {{ t(item.title) }}
          </v-list-item-title>
          <template #prepend>
            <v-chip
              v-if="settingsStore.settings.direction === 'rtl' && item.badge"
              :text="item.badge"
              size="small"
              color="primary"
              variant="flat"
            />
          </template>
          <template #append>
            <v-chip
              v-if="settingsStore.settings.direction !== 'rtl' && item.badge"
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
            <template v-if="settingsStore.settings.direction === 'rtl'" #append>
              <v-icon size="20">{{ item.icon }}</v-icon>
            </template>
            <template v-else #prepend>
              <v-icon size="20">{{ item.icon }}</v-icon>
            </template>
            <v-list-item-title class="nav-title" :class="{ 'text-right': settingsStore.settings.direction === 'rtl' }">
              {{ t(item.title) }}
            </v-list-item-title>
            <template #prepend>
              <v-icon
                v-if="settingsStore.settings.direction === 'rtl'"
                size="16"
                class="expand-icon"
                :class="{ 'expanded': expandedGroups[item.key] }"
              >
                mdi-chevron-down
              </v-icon>
            </template>
            <template #append>
              <v-icon
                v-if="settingsStore.settings.direction !== 'rtl'"
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
            v-if="expandedGroups[item.key]"
            class="nav-sublist"
            density="compact"
          >
            <v-list-item
              v-for="child in item.children"
              :key="child.key"
              :to="child.path"
              :active="isActive(child.path)"
              class="nav-subitem"
              :class="{ 'nav-subitem-active': isActive(child.path) }"
              @click="close"
            >
              <template #prepend>
                <v-icon v-if="settingsStore.settings.direction !== 'rtl'" size="16">{{ child.icon }}</v-icon>
                <v-chip
                  v-if="settingsStore.settings.direction === 'rtl' && child.badge"
                  :text="child.badge"
                  size="small"
                  color="primary"
                  variant="flat"
                />
              </template>
              <template #append>
                <v-icon v-if="settingsStore.settings.direction === 'rtl'" size="16">{{ child.icon }}</v-icon>
                <v-chip
                  v-if="settingsStore.settings.direction !== 'rtl' && child.badge"
                  :text="child.badge"
                  size="small"
                  color="primary"
                  variant="flat"
                />
              </template>
              <v-list-item-title class="nav-subtitle" :class="{ 'text-right': settingsStore.settings.direction === 'rtl' }">
                {{ t(child.title) }}
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </div>
      </div>
    </v-list>

    <!-- Footer Actions -->
    <template #append>
      <div class="nav-footer">
        <v-list density="compact">
          <v-list-item @click="handleSettings" class="nav-item">
            <template #prepend>
              <v-icon>mdi-cog</v-icon>
            </template>
            <v-list-item-title>{{ t('common.settings') }}</v-list-item-title>
          </v-list-item>
          <v-list-item @click="handleLogout" class="nav-item">
            <template #prepend>
              <v-icon>mdi-logout</v-icon>
            </template>
            <v-list-item-title>{{ t('common.logout') }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </template>

    <!-- Logout Confirmation Dialog -->
    <LogoutConfirmDialog
      v-model="showLogoutDialog"
      @confirm="performLogout"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { dashboardNavItems, isActiveRoute, type NavItem } from '../../utils/routes'
import { useAuthStore } from '../../stores/auth'
import LogoutConfirmDialog from '../common/LogoutConfirmDialog.vue'
import Logo from '../common/Logo.vue'
import { useSettingsStore } from '../../stores/settings'

const { t } = useI18n()
const settingsStore = useSettingsStore()

interface Props {
  open: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  'close': []
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

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

// Logout dialog state
const showLogoutDialog = ref(false)

// Computed properties
const isActive = computed(() => (path: string) => {
  return isActiveRoute(route.path, path)
})

// Watch for route changes to auto-expand relevant groups
watchEffect(() => {
  initializeExpandedGroups()
})

// Methods
const close = () => {
  emit('close')
}

const handleSettings = () => {
  router.push('/dashboard/settings')
  close()
}

const handleLogout = () => {
  showLogoutDialog.value = true
}

const performLogout = async () => {
  showLogoutDialog.value = false
  close()
  await authStore.logout()
  await router.push('/auth/login')
}
</script>

<style scoped>
/* .mobile-nav {
  @apply bg-surface;
} */

.nav-header {
  @apply flex items-center justify-center px-4 py-4 border-b border-outline min-h-20;
}

.user-info {
  @apply flex items-center px-4 py-4 border-b border-outline;
}

.user-avatar {
  @apply mr-3;
}

.user-details {
  @apply flex-1;
}

.user-name {
  @apply text-base font-semibold text-on-surface mb-0.5;
}

.user-role {
  @apply text-xs text-on-surface-variant capitalize;
}

.nav-list {
  @apply py-2 px-0 flex-1;
}

.nav-item {
  @apply mx-2 my-0.5 rounded-lg transition-all duration-200;
}

.nav-item:hover {
  @apply bg-gray-100 dark:bg-gray-800;
}

.nav-item-active {
  @apply bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm;
}

.nav-item-active:hover {
  @apply bg-blue-100 dark:bg-blue-900/30;
}

.nav-item-active .v-icon {
  @apply text-blue-600 dark:text-blue-400;
}

.nav-title {
  @apply text-sm font-medium;
}

.nav-title.text-right {
  text-align: right;
}

/* Navigation Groups */
.nav-group {
  @apply relative;
}

.nav-group-header {
  @apply mx-2 my-0.5 rounded-lg transition-all duration-200 cursor-pointer;
}

.nav-group-header:hover {
  @apply bg-gray-100 dark:bg-gray-800;
}

.nav-group-active {
  @apply bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm;
}

.nav-group-active:hover {
  @apply bg-blue-100 dark:bg-blue-900/30;
}

.nav-group-expanded {
  @apply bg-gray-50 dark:bg-gray-800/50;
}

.expand-icon {
  @apply transition-transform duration-200 opacity-60;
}

.expand-icon.expanded {
  @apply rotate-180;
}

/* RTL specific styles */
.nav-rtl .expand-icon:not(.expanded) {
  @apply rotate-90;
}

.nav-rtl .expand-icon.expanded {
  @apply -rotate-90;
}

/* Sub Navigation */
.nav-sublist {
  @apply pl-4 pr-2 mt-1 mb-2;
}

.nav-rtl .nav-sublist {
  @apply pl-2 pr-4;
}

.nav-subitem {
  @apply mx-0 my-px rounded-md min-h-10 px-3 py-0 transition-all duration-200;
}

.nav-subitem:hover {
  @apply bg-gray-100 dark:bg-gray-800;
}

.nav-subitem-active {
  @apply bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm;
}

.nav-subitem-active:hover {
  @apply bg-blue-100 dark:bg-blue-900/30;
}

.nav-subitem-active .v-icon {
  @apply text-blue-600 dark:text-blue-400;
}

.nav-subtitle {
  @apply text-[0.85rem] font-medium opacity-90;
}

.nav-subtitle.text-right {
  text-align: right;
}

.nav-footer {
  @apply border-t border-gray-200 dark:border-gray-700 py-2 px-0;
}
</style>
