<template>
  <v-navigation-drawer
    :model-value="open"
    @update:model-value="$emit('update:open', $event)"
    temporary
    location="left"
    class="mobile-nav"
  >
    <!-- Header -->
    <div class="nav-header">
      <v-img
        src="/logo-full.png"
        width="120"
        class="logo"
        contain
      />
    </div>

    <!-- User Info -->
    <div class="user-info">
      <v-avatar size="48" class="user-avatar">
        <img :src="authStore.user?.photoURL || '/placeholder.svg'" :alt="authStore.displayName" />
      </v-avatar>
      <div class="user-details">
        <div class="user-name">{{ authStore.displayName }}</div>
        <div class="user-role">{{ authStore.userRole }}</div>
      </div>
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
        @click="close"
      >
        <template #prepend>
          <v-icon size="20">{{ item.icon }}</v-icon>
        </template>
        <v-list-item-title class="nav-title">
          {{ t(item.title) }}
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
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import LogoutConfirmDialog from '../common/LogoutConfirmDialog.vue'

const { t } = useI18n()

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

interface NavItem {
  key: string
  title: string
  path: string
  icon: string
  badge?: string | number
}

// Navigation items
const navItems = ref<NavItem[]>([
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
  }
])

// Logout dialog state
const showLogoutDialog = ref(false)

// Computed properties
const isActive = computed(() => (path: string) => {
  return route.path === path || route.path.startsWith(path + '/')
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

.nav-footer {
  border-top: 1px solid rgb(var(--v-theme-surface-variant));
  padding: 8px 0;
}
</style>
