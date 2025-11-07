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
        <!-- Info Box for Mobile -->
        <DashboardNavInfo :mini="false" :mobile="true" />

        <!-- Action Buttons -->
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
import DashboardNavInfo from './DashboardNavInfo.vue'

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
.mobile-nav {
  background: rgb(var(--v-theme-surface));
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
  min-height: 80px;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
}

.user-avatar {
  margin-right: 12px;
}

.user-details {
  flex: 1;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 2px;
}

.user-role {
  font-size: 0.75rem;
  color: rgb(var(--v-theme-on-surface-variant));
  text-transform: capitalize;
}

.nav-list {
  padding: 8px 0;
  flex: 1;
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

.nav-title.text-right {
  text-align: right;
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

/* RTL specific styles */
.nav-rtl .expand-icon:not(.expanded) {
  transform: rotate(90deg);
}

.nav-rtl .expand-icon.expanded {
  transform: rotate(-90deg);
}

/* Sub Navigation */
.nav-sublist {
  padding-left: 16px;
  padding-right: 8px;
  margin-top: 4px;
  margin-bottom: 8px;
}

.nav-rtl .nav-sublist {
  padding-left: 8px;
  padding-right: 16px;
}

.nav-subitem {
  margin: 1px 0;
  border-radius: 6px;
  min-height: 40px;
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

.nav-subtitle.text-right {
  text-align: right;
}

.nav-footer {
  border-top: 1px solid rgb(var(--v-theme-surface-variant));
  padding: 8px 0;
}
</style>
