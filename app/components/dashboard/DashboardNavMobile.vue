<template>
  <GkNavigationDrawer
    v-model="open"
    temporary
    location="start"
    :dir="settingsStore.settings.direction === 'rtl' ? 'rtl' : 'ltr'"
    class="mobile-nav"
    :class="{
      'nav-rtl': settingsStore.settings.direction === 'rtl'
    }"
    width="300"
    aria-label="Mobile navigation menu"
  >
    <div class="nav-header">
      <Logo
        variant="compact"
        size="md"
        class="logo"
      />
    </div>

    <div class="user-info">
      <img
        :src="authStore.user?.photoURL || '/assets/images/avatar.webp'"
        :alt="authStore.displayName || ''"
        class="user-avatar h-12 w-12 rounded-full object-cover shrink-0"
      />
      <div class="user-details min-w-0">
        <div class="user-name">{{ authStore.displayName || 'Demo User' }}</div>
        <div class="user-role">{{ authStore.userRole || 'User' }}</div>
      </div>
    </div>

    <ul class="nav-list list-none p-0 m-0 flex flex-col flex-1">
      <li v-for="item in navItems" :key="item.key">
        <NuxtLink
          v-if="!item.children"
          :to="item.path"
          class="nav-item flex items-center gap-2 px-3 py-2 mx-2 rounded-lg"
          :class="{
            'nav-item-active': isActive(item.path),
            'flex-row-reverse': settingsStore.settings.direction === 'rtl',
          }"
          @click="close"
        >
          <AppIcon
            v-if="settingsStore.settings.direction !== 'rtl'"
            :name="item.icon.replace('mdi-', '')"
            :size="20"
          />
          <span
            class="nav-title flex-1"
            :class="{ 'text-right': settingsStore.settings.direction === 'rtl' }"
          >
            {{ t(item.title) }}
          </span>
          <AppIcon
            v-if="settingsStore.settings.direction === 'rtl'"
            :name="item.icon.replace('mdi-', '')"
            :size="20"
          />
          <span
            v-if="item.badge"
            class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-[color-mix(in_srgb,var(--gk-color-primary)_15%,transparent)] text-[var(--gk-color-primary)]"
          >
            {{ item.badge }}
          </span>
        </NuxtLink>

        <div v-else class="nav-group">
          <button
            type="button"
            class="nav-group-header w-full flex items-center gap-2 px-3 py-2 mx-2 rounded-lg border-0 bg-transparent cursor-pointer"
            :class="{
              'nav-group-active': isActive(item.path),
              'nav-group-expanded': expandedGroups[item.key],
              'flex-row-reverse': settingsStore.settings.direction === 'rtl',
            }"
            @click="toggleGroup(item.key)"
          >
            <AppIcon
              v-if="settingsStore.settings.direction !== 'rtl'"
              :name="item.icon.replace('mdi-', '')"
              :size="20"
            />
            <span
              class="nav-title flex-1"
              :class="{ 'text-right': settingsStore.settings.direction === 'rtl' }"
            >
              {{ t(item.title) }}
            </span>
            <AppIcon
              v-if="settingsStore.settings.direction === 'rtl'"
              :name="item.icon.replace('mdi-', '')"
              :size="20"
            />
            <AppIcon
              name="chevron-down"
              :size="16"
              class="expand-icon shrink-0"
              :class="{ expanded: expandedGroups[item.key] }"
            />
          </button>

          <ul
            v-if="expandedGroups[item.key]"
            class="nav-sublist list-none p-0 m-0"
          >
            <li v-for="child in item.children" :key="child.key">
              <NuxtLink
                :to="child.path"
                class="nav-subitem flex items-center gap-2 px-3 py-2 mx-2 rounded-md"
                :class="{
                  'nav-subitem-active': isActive(child.path),
                  'flex-row-reverse': settingsStore.settings.direction === 'rtl',
                }"
                @click="close"
              >
                <AppIcon
                  v-if="settingsStore.settings.direction !== 'rtl'"
                  :name="child.icon.replace('mdi-', '')"
                  :size="16"
                />
                <span
                  class="nav-subtitle flex-1"
                  :class="{ 'text-right': settingsStore.settings.direction === 'rtl' }"
                >
                  {{ t(child.title) }}
                </span>
                <AppIcon
                  v-if="settingsStore.settings.direction === 'rtl'"
                  :name="child.icon.replace('mdi-', '')"
                  :size="16"
                />
                <span
                  v-if="child.badge"
                  class="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-[color-mix(in_srgb,var(--gk-color-primary)_15%,transparent)] text-[var(--gk-color-primary)]"
                >
                  {{ child.badge }}
                </span>
              </NuxtLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>

    <template #append>
      <div class="nav-footer">
        <DashboardNavInfo :mini="false" :mobile="true" />

        <ul class="list-none p-0 m-0">
          <li>
            <button
              type="button"
              class="nav-item w-full flex items-center gap-2 px-3 py-2 mx-2 rounded-lg border-0 bg-transparent cursor-pointer text-left"
              @click="handleSettings"
            >
              <AppIcon name="cog" :size="20" />
              {{ t('common.settings') }}
            </button>
          </li>
          <li>
            <button
              type="button"
              class="nav-item w-full flex items-center gap-2 px-3 py-2 mx-2 rounded-lg border-0 bg-transparent cursor-pointer text-left"
              @click="handleLogout"
            >
              <AppIcon name="logout" :size="20" />
              {{ t('common.logout') }}
            </button>
          </li>
        </ul>
      </div>
    </template>

    <LogoutConfirmDialog
      v-model="showLogoutDialog"
      @confirm="performLogout"
    />
  </GkNavigationDrawer>
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import { GkNavigationDrawer } from 'god-kit/vue'
import { dashboardNavItems, isActiveRoute } from '../../utils/routes'
import { useAuthStore } from '../../stores/auth'
import LogoutConfirmDialog from '../common/LogoutConfirmDialog.vue'
import Logo from '../common/Logo.vue'
import { useSettingsStore } from '../../stores/settings'
import DashboardNavInfo from './DashboardNavInfo.vue'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()
const settingsStore = useSettingsStore()

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  close: []
}>()

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()

const navItems = ref(dashboardNavItems)
const expandedGroups = ref<Record<string, boolean>>({})
const showLogoutDialog = ref(false)

const initializeExpandedGroups = () => {
  navItems.value.forEach(item => {
    if (item.children) {
      const hasActiveChild = item.children.some(child => isActiveRoute(route.path, child.path))
      expandedGroups.value[item.key] = hasActiveChild
    }
  })
}

const toggleGroup = (key: string) => {
  expandedGroups.value[key] = !expandedGroups.value[key]
}

watchEffect(() => {
  initializeExpandedGroups()
})

const isActive = computed(() => (path: string) => {
  return isActiveRoute(route.path, path)
})

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
  background: var(--gk-color-surface);
}

.nav-header {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  border-bottom: 1px solid var(--gk-color-border);
  min-height: 80px;
}

.user-info {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--gk-color-border);
}

.user-avatar {
  margin-right: 12px;
}

.user-name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
  margin-bottom: 2px;
}

.user-role {
  font-size: 0.75rem;
  color: var(--gk-color-on-surface-muted);
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
  color: var(--gk-color-on-surface);
  text-decoration: none;
}

.nav-item:hover {
  background: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
}

.nav-item-active {
  background: color-mix(in srgb, var(--gk-color-primary) 15%, transparent);
  color: var(--gk-color-primary);
}

.nav-title {
  font-size: 0.875rem;
  font-weight: 500;
}

.nav-group-header {
  margin: 2px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  color: var(--gk-color-on-surface);
}

.nav-group-header:hover {
  background: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
}

.nav-group-active {
  background: color-mix(in srgb, var(--gk-color-primary) 15%, transparent);
  color: var(--gk-color-primary);
}

.expand-icon {
  transition: transform 0.2s ease;
  opacity: 0.6;
}

.expand-icon.expanded {
  transform: rotate(180deg);
}

.nav-rtl .expand-icon:not(.expanded) {
  transform: rotate(90deg);
}

.nav-rtl .expand-icon.expanded {
  transform: rotate(-90deg);
}

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
  text-decoration: none;
  color: var(--gk-color-on-surface);
}

.nav-subitem:hover {
  background: color-mix(in srgb, var(--gk-color-on-surface) 6%, transparent);
}

.nav-subitem-active {
  background: color-mix(in srgb, var(--gk-color-primary) 12%, transparent);
  color: var(--gk-color-primary);
}

.nav-subtitle {
  font-size: 0.85rem;
  font-weight: 500;
}

.nav-footer {
  border-top: 1px solid var(--gk-color-border);
  padding: 8px 0;
}
</style>
