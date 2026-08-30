<template>
  <header class="dashboard-header panel-header-bar">
    <GkButton
      variant="ghost"
      slim
      class="dashboard-header__hamburger"
      :aria-label="t('common.menu')"
      @click="$emit('toggle-nav')"
    >
      <AppIcon name="menu" :size="24" />
    </GkButton>

    <Logo variant="icon" size="sm" class="dashboard-header__logo" />

    <nav class="dashboard-header__breadcrumbs" :aria-label="t('common.breadcrumb')">
      <template v-for="(crumb, index) in breadcrumbs" :key="crumb.path">
        <NuxtLink
          v-if="index < breadcrumbs.length - 1"
          :to="crumb.path"
          class="dashboard-header__crumb"
        >
          {{ crumb.title }}
        </NuxtLink>
        <span v-else class="dashboard-header__crumb dashboard-header__crumb--current" aria-current="page">
          {{ crumb.title }}
        </span>
        <span v-if="index < breadcrumbs.length - 1" class="dashboard-header__sep" aria-hidden="true">/</span>
      </template>
    </nav>

    <div class="dashboard-header__spacer" />

    <div class="dashboard-header__actions">
      <LanguageSwitcher />
      <SettingsButton />

      <GkMenu v-model="notifOpen" placement="bottom-end">
        <template #activator="{ props: activator }">
          <GkButton
            v-bind="activator"
            variant="ghost"
            slim
            :aria-label="t('settings.notifications')"
          >
            <span class="dashboard-header__bell">
              <AppIcon name="bell" :size="24" />
              <span v-if="unread.length" class="dashboard-header__badge">
                {{ unread.length }}
              </span>
            </span>
          </GkButton>
        </template>

        <div class="panel-menu-surface dashboard-header__panel">
          <div class="dashboard-header__panel-head">
            <span class="font-semibold">{{ t('settings.notifications') }}</span>
            <button
              v-if="unread.length"
              type="button"
              class="dashboard-header__link"
              @click="markAllAsRead"
            >
              {{ t('settings.markAllRead') }}
            </button>
          </div>

          <div class="panel-divider" role="separator" />

          <ul class="dashboard-header__list" role="menu">
            <li v-if="!items.length" class="dashboard-header__empty" role="menuitem">
              {{ t('settings.noNewNotifications') }}
            </li>
            <li v-for="item in items.slice(0, 5)" :key="item.id" role="menuitem">
              <button
                type="button"
                class="dashboard-header__item"
                :class="{ 'dashboard-header__item--read': item.read }"
                @click="markAsRead(item.id)"
              >
                <span class="dashboard-header__item-icon">
                  <AppIcon :name="item.icon" :size="20" />
                </span>
                <span class="dashboard-header__item-text">
                  <span class="dashboard-header__item-title">{{ item.title }}</span>
                  <span class="dashboard-header__item-message">{{ item.message }}</span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </GkMenu>

      <GkMenu v-model="userOpen" placement="bottom-end">
        <template #activator="{ props: activator }">
          <GkButton
            v-bind="activator"
            variant="ghost"
            slim
            :aria-label="t('settings.account')"
          >
            <img
              :src="auth.user?.photoURL || FALLBACK_AVATAR"
              :alt="auth.displayName"
              class="dashboard-header__avatar"
            >
          </GkButton>
        </template>

        <div class="panel-menu-surface dashboard-header__panel dashboard-header__panel--user">
          <div class="dashboard-header__identity">
            <img
              :src="auth.user?.photoURL || FALLBACK_AVATAR"
              :alt="auth.displayName"
              class="dashboard-header__avatar dashboard-header__avatar--lg"
            >
            <span class="min-w-0">
              <span class="dashboard-header__item-title">{{ auth.displayName }}</span>
              <span class="dashboard-header__item-message">{{ auth.email }}</span>
            </span>
          </div>

          <div class="panel-divider" role="separator" />

          <GkButton variant="ghost" block class="dashboard-header__menu-btn" @click="go('/dashboard/profile')">
            <AppIcon name="account" :size="18" class="me-2" />
            {{ t('settings.profile') }}
          </GkButton>
          <GkButton variant="ghost" block class="dashboard-header__menu-btn" @click="go('/dashboard/settings')">
            <AppIcon name="cog" :size="18" class="me-2" />
            {{ t('common.settings') }}
          </GkButton>

          <div class="panel-divider" role="separator" />

          <GkButton
            variant="ghost"
            block
            class="dashboard-header__menu-btn dashboard-header__menu-btn--danger"
            @click="askLogout"
          >
            <AppIcon name="logout" :size="18" class="me-2" />
            {{ t('common.logout') }}
          </GkButton>
        </div>
      </GkMenu>
    </div>

    <LogoutConfirmDialog v-model="logoutOpen" @confirm="logout" />
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { GkButton, GkMenu } from 'god-kit/vue'
import { generateBreadcrumbs } from '~/utils/routes'
import SettingsButton from '~/components/theme/SettingsButton.vue'
import LanguageSwitcher from '~/components/theme/LanguageSwitcher.vue'
import LogoutConfirmDialog from '~/components/common/LogoutConfirmDialog.vue'
import AppIcon from '~/components/ui/AppIcon.vue'
import Logo from '~/components/common/Logo.vue'

const FALLBACK_AVATAR = '/assets/images/avatar.webp'

defineEmits<{ 'toggle-nav': [] }>()

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()
const { items, unread, markAsRead, markAllAsRead } = useNotifications()

const notifOpen = ref(false)
const userOpen = ref(false)
const logoutOpen = ref(false)

const breadcrumbs = computed(() =>
  generateBreadcrumbs(route.path).map((crumb) => ({
    path: crumb.path,
    // Nav titles are i18n keys; generated segments are already human-readable.
    title: crumb.title.includes('.') ? t(crumb.title) : crumb.title,
  }))
)

function go(path: string) {
  userOpen.value = false
  router.push(path)
}

function askLogout() {
  userOpen.value = false
  logoutOpen.value = true
}

async function logout() {
  logoutOpen.value = false
  await auth.logout()
  await router.push('/auth/login')
}
</script>

<style scoped>
.dashboard-header {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
  min-height: 64px;
  padding-inline: 0.75rem;
  color: var(--gk-color-on-surface);
  /* Keeps the gradient hairline behind the controls. */
  isolation: isolate;
  backdrop-filter: blur(8px);
}

.dashboard-header__spacer {
  flex: 1 1 auto;
}

.dashboard-header__actions {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.dashboard-header__hamburger,
.dashboard-header__logo {
  display: none;
}

@media (max-width: 959px) {
  .dashboard-header__hamburger {
    display: inline-flex;
  }

  .dashboard-header__logo {
    display: block;
    margin-inline-end: 0.5rem;
  }
}

/* Breadcrumbs */
.dashboard-header__breadcrumbs {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin-inline-start: 0.75rem;
  font-size: 0.875rem;
  min-width: 0;
}

@media (max-width: 959px) {
  .dashboard-header__breadcrumbs {
    display: none;
  }
}

.dashboard-header__crumb {
  color: var(--gk-color-on-surface-muted);
  text-decoration: none;
  white-space: nowrap;
}

.dashboard-header__crumb:hover {
  color: var(--gk-color-primary);
  text-decoration: underline;
}

.dashboard-header__crumb--current {
  color: var(--gk-color-on-surface);
  font-weight: 600;
}

.dashboard-header__sep {
  color: var(--gk-color-on-surface-muted);
  opacity: 0.5;
}

/* Notification bell */
.dashboard-header__bell {
  position: relative;
  display: inline-flex;
}

.dashboard-header__badge {
  position: absolute;
  top: -4px;
  inset-inline-end: -4px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding-inline: 3px;
  border-radius: 999px;
  background: var(--gk-color-danger);
  color: var(--gk-color-base-white, #fff);
  font-size: 10px;
  font-weight: 600;
  line-height: 1;
}

/* Dropdown panels */
.dashboard-header__panel {
  min-width: 288px;
  padding: 0.25rem;
  overflow: hidden;
}

.dashboard-header__panel--user {
  min-width: 248px;
}

.dashboard-header__panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  padding: 0.5rem 0.625rem;
  font-size: 0.875rem;
}

.dashboard-header__link {
  border: 0;
  background: none;
  padding: 0;
  color: var(--gk-color-primary);
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
}

.dashboard-header__link:hover {
  text-decoration: underline;
}

.dashboard-header__list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.dashboard-header__empty {
  padding: 0.75rem 0.625rem;
  color: var(--gk-color-on-surface-muted);
  font-size: 0.875rem;
}

.dashboard-header__item {
  display: flex;
  gap: 0.625rem;
  width: 100%;
  padding: 0.5rem;
  border: 0;
  border-radius: var(--panel-radius-sm);
  background: none;
  text-align: start;
  cursor: pointer;
  color: inherit;
}

.dashboard-header__item:hover {
  background: color-mix(in srgb, var(--gk-color-primary) 8%, transparent);
}

.dashboard-header__item--read {
  opacity: 0.55;
}

.dashboard-header__item-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: var(--panel-radius-sm);
  background: color-mix(in srgb, var(--gk-color-primary) 12%, transparent);
  color: var(--gk-color-primary);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gk-color-primary) 22%, transparent);
}

.dashboard-header__item-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.dashboard-header__item-title {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dashboard-header__item-message {
  display: block;
  font-size: 0.75rem;
  color: var(--gk-color-on-surface-muted);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

/* User menu */
.dashboard-header__identity {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.5rem;
}

.dashboard-header__avatar {
  width: 32px;
  height: 32px;
  border-radius: 999px;
  object-fit: cover;
}

.dashboard-header__avatar--lg {
  width: 40px;
  height: 40px;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--gk-color-primary) 25%, transparent);
}

/* GkButton centres its content; menu rows read better left-aligned. */
.dashboard-header__menu-btn :deep(.gk-btn__inner),
.dashboard-header__menu-btn:deep(.gk-btn__inner) {
  justify-content: flex-start;
}

.dashboard-header__menu-btn {
  justify-content: flex-start;
  border-radius: var(--panel-radius-sm);
}

.dashboard-header__menu-btn--danger {
  color: var(--gk-color-danger);
}

.dashboard-header__menu-btn--danger:hover {
  background: color-mix(in srgb, var(--gk-color-danger) 8%, transparent);
}
</style>
