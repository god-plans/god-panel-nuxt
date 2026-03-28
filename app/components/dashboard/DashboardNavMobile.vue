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
              class="dn-nav-item mobile-nav__action w-full border-0 bg-transparent cursor-pointer text-start"
              @click="handleSettings"
            >
              <span class="dn-nav-item__icon" aria-hidden="true">
                <AppIcon name="cog" :size="20" />
              </span>
              <span class="dn-nav-item__title">{{ t('common.settings') }}</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="dn-nav-item mobile-nav__action mobile-nav__action--danger w-full border-0 bg-transparent cursor-pointer text-start"
              @click="handleLogout"
            >
              <span class="dn-nav-item__icon" aria-hidden="true">
                <AppIcon name="logout" :size="20" />
              </span>
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
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--gk-color-primary) 4%, var(--gk-color-surface)),
    var(--gk-color-surface) 22%
  );
}

.mobile-nav :deep(.gk-navigation-drawer__surface) {
  min-height: 100vh;
  min-height: 100dvh;
  background: transparent;
}

.mobile-nav__user {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  margin: 0 0.75rem 0.5rem;
  padding: 1rem 1rem 1rem 0.85rem;
  border-radius: 14px;
  border: 1px solid color-mix(in srgb, var(--gk-color-border) 70%, transparent);
  background: color-mix(in srgb, var(--gk-color-surface) 88%, var(--gk-color-primary));
  box-shadow:
    0 1px 0 color-mix(in srgb, var(--gk-color-on-surface) 6%, transparent) inset,
    0 8px 28px color-mix(in srgb, var(--gk-color-on-surface) 6%, transparent);
}

.mobile-nav__avatar {
  margin-inline-end: 0;
  box-shadow:
    0 0 0 2px var(--gk-color-surface),
    0 0 0 4px color-mix(in srgb, var(--gk-color-primary) 28%, transparent);
}

.mobile-nav__user-text {
  min-width: 0;
}

.mobile-nav__name {
  font-size: 1.02rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--gk-color-on-surface);
  margin-bottom: 3px;
  line-height: 1.25;
}

.mobile-nav__role {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--gk-color-on-surface-muted);
  text-transform: capitalize;
  letter-spacing: 0.02em;
}

.mobile-nav__footer {
  border-top: 1px solid color-mix(in srgb, var(--gk-color-border) 85%, transparent);
  padding: 0.5rem 0 0.35rem;
  background: color-mix(in srgb, var(--gk-color-border) 22%, transparent);
}

.mobile-nav__actions {
  padding: 0 0.35rem 0.35rem;
}

.mobile-nav__actions .dn-nav-item {
  margin: 4px 0.35rem;
}

.mobile-nav__action--danger:hover .dn-nav-item__icon {
  color: var(--gk-color-danger) !important;
  background: color-mix(in srgb, var(--gk-color-danger) 12%, transparent) !important;
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gk-color-danger) 22%, transparent);
}

.mobile-nav__action--danger:hover {
  color: var(--gk-color-danger) !important;
  background: color-mix(in srgb, var(--gk-color-danger) 7%, transparent) !important;
}
</style>
