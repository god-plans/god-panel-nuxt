<template>
  <GkNavigationDrawer
    v-model="open"
    temporary
    location="start"
    :dir="isRTL ? 'rtl' : 'ltr'"
    class="mobile-nav dn-nav"
    :class="{ 'nav-rtl': isRTL }"
    width="300"
    aria-label="Mobile navigation menu"
  >
    <DashboardNavBrand :mini="false" :show-toggle="false" />

    <div class="mobile-nav__user">
      <img
        :src="authStore.user?.photoURL || '/assets/images/avatar.webp'"
        :alt="authStore.displayName || ''"
        class="mobile-nav__avatar h-12 w-12 rounded-full object-cover shrink-0"
      />
      <div class="mobile-nav__user-text min-w-0">
        <div class="mobile-nav__name">
          {{ authStore.displayName || 'Demo User' }}
        </div>
        <div class="mobile-nav__role">
          {{ authStore.userRole || 'User' }}
        </div>
      </div>
    </div>

    <ul
      class="dn-nav-list list-none p-0 m-0 flex min-h-0 min-w-0 flex-col overflow-x-hidden"
    >
      <template v-for="item in navItems" :key="item.key">
        <DashboardNavItemLink
          v-if="!item.children"
          :item="item"
          :active="isItemActive(item.path)"
          :show-labels="true"
          :is-r-t-l="isRTL"
          @navigate="close"
        />
        <DashboardNavGroup
          v-else
          :item="item"
          :mini="false"
          :show-labels="true"
          :expanded="!!expandedGroups[item.key]"
          :group-active="isItemActive(item.path)"
          :is-r-t-l="isRTL"
          :is-item-active="isItemActive"
          @toggle="() => toggleGroup(item.key)"
          @navigate="close"
        />
      </template>
    </ul>

    <template #append>
      <div class="mobile-nav__footer">
        <DashboardNavInfo :mini="false" :mobile="true" />

        <ul class="mobile-nav__actions list-none p-0 m-0">
          <li>
            <button
              type="button"
              class="dn-nav-item w-full border-0 bg-transparent cursor-pointer text-start"
              @click="handleSettings"
            >
              <AppIcon name="cog" :size="20" class="shrink-0" />
              <span class="dn-nav-item__title">{{ t('common.settings') }}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="dn-nav-item w-full border-0 bg-transparent cursor-pointer text-start"
              @click="handleLogout"
            >
              <AppIcon name="logout" :size="20" class="shrink-0" />
              <span class="dn-nav-item__title">{{ t('common.logout') }}</span>
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
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { GkNavigationDrawer } from 'god-kit/vue'
import { useAuthStore } from '~/stores/auth'
import { useSettingsStore } from '~/stores/settings'
import { useDashboardNavMenu } from '~/composables/useDashboardNavMenu'
import DashboardNavBrand from '~/components/dashboard/DashboardNavBrand.vue'
import DashboardNavItemLink from '~/components/dashboard/DashboardNavItemLink.vue'
import DashboardNavGroup from '~/components/dashboard/DashboardNavGroup.vue'
import DashboardNavInfo from '~/components/dashboard/DashboardNavInfo.vue'
import LogoutConfirmDialog from '~/components/common/LogoutConfirmDialog.vue'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()
const router = useRouter()
const authStore = useAuthStore()
const settingsStore = useSettingsStore()

const open = defineModel<boolean>('open', { required: true })

const emit = defineEmits<{
  close: []
}>()

const { navItems, expandedGroups, toggleGroup, isItemActive } =
  useDashboardNavMenu()

const isRTL = computed(() => settingsStore.settings.direction === 'rtl')
const showLogoutDialog = ref(false)

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

.mobile-nav :deep(.gk-navigation-drawer__surface) {
  min-height: 100vh;
  min-height: 100dvh;
}

.mobile-nav__user {
  display: flex;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid var(--gk-color-border);
}

.mobile-nav__avatar {
  margin-inline-end: 12px;
}

.mobile-nav__name {
  font-size: 1rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
  margin-bottom: 2px;
}

.mobile-nav__role {
  font-size: 0.75rem;
  color: var(--gk-color-on-surface-muted);
  text-transform: capitalize;
}

.mobile-nav__footer {
  border-top: 1px solid var(--gk-color-border);
  padding: 8px 0;
}

.mobile-nav__actions .dn-nav-item {
  margin: 2px 8px;
}
</style>
