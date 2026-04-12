<template>
  <header
    class="dashboard-header panel-header-bar flex w-full min-h-[64px] shrink-0 items-center px-2 md:px-4 z-[1] text-[var(--gk-color-on-surface)]"
  >
    <GkButton
      variant="ghost"
      class="nav-hamburger shrink-0"
      slim
      :aria-label="t('common.menu')"
      @click="$emit('toggle-nav')"
    >
      <AppIcon name="menu" :size="24" />
    </GkButton>

    <Logo
      v-if="mobile"
      variant="icon"
      size="sm"
      class="mr-3 lg:hidden shrink-0"
    />

    <nav
      class="breadcrumbs hidden lg:flex items-center gap-1 text-sm ml-4"
      aria-label="Breadcrumb"
    >
      <template v-for="(item, index) in breadcrumbItems" :key="index">
        <NuxtLink
          v-if="item.to && !item.disabled"
          :to="item.to"
          class="breadcrumb-item hover:underline text-[var(--gk-color-on-surface)]"
        >
          {{ item.title }}
        </NuxtLink>
        <span v-else class="text-[var(--gk-color-on-surface-muted)]">
          {{ item.title }}
        </span>
        <span
          v-if="index < breadcrumbItems.length - 1"
          class="text-[var(--gk-color-on-surface-muted)] px-1"
          aria-hidden="true"
        >
          /
        </span>
      </template>
    </nav>

    <div class="flex-1" />

    <div class="me-2">
    <LanguageSwitcher  />
  </div>
    <SettingsButton />


    <GkMenu v-model="notifOpen" placement="bottom-end" class="shrink-0">
      <template #activator="{ props: act }">
        <GkButton
          v-bind="act"
          variant="ghost"
          class="notification-btn"
          slim
          :aria-label="t('settings.notifications')"
        >
          <span class="relative inline-flex">
            <AppIcon name="bell" :size="24" />
            <span
              v-if="notifications.length > 0"
              class="absolute -top-1 -end-1 min-w-[18px] h-[18px] px-0.5 flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] font-medium"
            >
              {{ notifications.length }}
            </span>
          </span>
        </GkButton>
      </template>

      <ul
        class="notification-list panel-menu-surface min-w-[280px] list-none p-1 m-0 overflow-hidden"
        role="menu"
      >
        <li
          v-if="notifications.length === 0"
          class="px-3 py-3 text-sm text-[var(--gk-color-on-surface-muted)]"
          role="menuitem"
        >
          {{ t("settings.noNewNotifications") }}
        </li>
        <li
          v-for="notification in notifications.slice(0, 5)"
          :key="notification.id"
          class="flex gap-3 px-2 py-2 cursor-pointer rounded-[var(--panel-radius-sm)] hover:bg-[color-mix(in_srgb,var(--gk-color-primary)_8%,transparent)]"
          role="menuitem"
          @click="markAsRead(notification.id)"
        >
          <span
            class="flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--panel-radius-sm)] bg-[color-mix(in_srgb,var(--gk-color-primary)_12%,transparent)] text-[var(--gk-color-primary)] shadow-[inset_0_0_0_1px_color-mix(in_srgb,var(--gk-color-primary)_22%,transparent)]"
          >
            <AppIcon :name="notification.icon.replace('mdi-', '')" :size="20" />
          </span>
          <div class="min-w-0">
            <div class="text-sm font-medium">{{ notification.title }}</div>
            <div class="text-xs opacity-80 truncate">{{ notification.message }}</div>
          </div>
        </li>
        <li v-if="notifications.length > 0" class="px-1 py-0">
          <div class="panel-divider my-1" role="separator" />
        </li>
        <li
          v-if="notifications.length > 0"
          class="px-2 py-2 text-sm font-medium text-[var(--gk-color-primary)] cursor-pointer rounded-[var(--panel-radius-sm)] hover:bg-[color-mix(in_srgb,var(--gk-color-primary)_8%,transparent)]"
          role="menuitem"
          @click="viewAllNotifications"
        >
          {{ t("settings.viewAllNotifications") }}
        </li>
      </ul>
    </GkMenu>

    <GkMenu v-model="userOpen" placement="bottom-end" class="shrink-0">
      <template #activator="{ props: act }">
        <GkButton
          v-bind="act"
          variant="ghost"
          class="user-btn"
          slim
          :aria-label="authStore.displayName || 'User'"
        >
          <img
            :src="authStore.user?.photoURL || '/assets/images/avatar.webp'"
            :alt="authStore.displayName || ''"
            class="h-8 w-8 rounded-full object-cover"
          />
        </GkButton>
      </template>

      <div class="user-menu panel-menu-surface text-start min-w-[240px] overflow-hidden p-1">
        <div class="flex gap-3 px-2 py-2 items-center rounded-[var(--panel-radius-sm)]">
          <img
            :src="authStore.user?.photoURL || '/assets/images/avatar.webp'"
            :alt="authStore.displayName || ''"
            class="h-10 w-10 rounded-full object-cover ring-2 ring-[color-mix(in_srgb,var(--gk-color-primary)_25%,transparent)]"
          />
          <div class="min-w-0">
            <div class="text-sm font-semibold truncate">
              {{ authStore.displayName || "Demo User" }}
            </div>
            <div class="text-xs text-[var(--gk-color-on-surface-muted)] truncate">
              {{ authStore.userEmail || "demo@example.com" }}
            </div>
          </div>
        </div>
        <div class="panel-divider my-1" role="separator" />
        <ul class="list-none p-0 m-0">
          <li>
            <GkButton
              variant="ghost"
              block
              class="justify-start !rounded-none"
              @click="goToProfile"
            >
              <AppIcon name="account" class="me-2" />
              {{ t("settings.profile") }}
            </GkButton>
          </li>
          <li>
            <GkButton
              variant="ghost"
              block
              class="justify-start !rounded-none"
              @click="goToSettings"
            >
              <AppIcon name="cog" class="me-2" />
              {{ t("common.settings") }}
            </GkButton>
          </li>
        </ul>
        <div class="panel-divider my-1" role="separator" />
        <GkButton
          variant="ghost"
          block
          class="justify-start !rounded-[var(--panel-radius-sm)] text-[var(--gk-color-danger)] hover:bg-[color-mix(in_srgb,var(--gk-color-danger)_8%,transparent)]"
          @click="handleLogout"
        >
          <AppIcon name="logout" class="me-2" />
          {{ t("common.logout") }}
        </GkButton>
      </div>
    </GkMenu>

    <LogoutConfirmDialog v-model="showLogoutDialog" @confirm="performLogout" />
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { GkButton, GkMenu } from "god-kit/vue";
import { generateBreadcrumbs } from "~/utils/routes";
import { useAuthStore } from "~/stores/auth";
import SettingsButton from "~/components/theme/SettingsButton.vue";
import LanguageSwitcher from "~/components/theme/LanguageSwitcher.vue";
import LogoutConfirmDialog from "~/components/common/LogoutConfirmDialog.vue";
import AppIcon from "~/components/ui/AppIcon.vue";
import Logo from "~/components/common/Logo.vue";

const { t } = useI18n();

interface Props {
  mobile?: boolean;
  isHorizontal?: boolean;
}

withDefaults(defineProps<Props>(), {
  mobile: false,
  isHorizontal: false,
});

defineEmits<{
  "toggle-nav": [];
}>();

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

const notifOpen = ref(false);
const userOpen = ref(false);
const showLogoutDialog = ref(false);

const breadcrumbItems = computed(() => {
  const breadcrumbs = generateBreadcrumbs(route.path);
  return breadcrumbs.map((crumb, index) => ({
    title: crumb.title.includes(".") ? t(crumb.title) : crumb.title,
    to: index === breadcrumbs.length - 1 ? undefined : crumb.path,
    disabled: index === breadcrumbs.length - 1,
  }));
});

const notifications = ref([
  {
    id: 1,
    title: "New order received",
    message: "Order #1234 has been placed",
    icon: "mdi-cart",
    color: "success",
    read: false,
  },
  {
    id: 2,
    title: "Payment failed",
    message: "Payment for order #1233 failed",
    icon: "mdi-credit-card-off",
    color: "error",
    read: false,
  },
  {
    id: 3,
    title: "New user registered",
    message: "John Doe joined your platform",
    icon: "mdi-account-plus",
    color: "info",
    read: false,
  },
]);

const markAsRead = (id: number) => {
  const notification = notifications.value.find((n) => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const viewAllNotifications = () => {
  notifOpen.value = false;
  router.push("/dashboard/notifications");
};

const goToProfile = () => {
  userOpen.value = false;
  router.push("/dashboard/profile");
};

const goToSettings = () => {
  userOpen.value = false;
  router.push("/dashboard/settings");
};

const handleLogout = () => {
  userOpen.value = false;
  showLogoutDialog.value = true;
};

const performLogout = async () => {
  showLogoutDialog.value = false;
  await authStore.logout();
  await router.push("/auth/login");
};
</script>

<style scoped>
.dashboard-header {
  /* Ensure content sits above gradient hairline */
  isolation: isolate;
}

/* god-kit GkButton defaults to centered inner; menus should align to start */
.user-menu :deep(.gk-btn) {
  justify-content: flex-start;
}

.user-menu :deep(.gk-btn__inner) {
  justify-content: flex-start;
}

.notification-btn,
.user-btn {
  @media (max-width: 959px) {
    margin-left: 0px;
  }
  @media (min-width: 960px) {
    margin-left: 8px;
  }
}

[dir="rtl"] .notification-btn,
[dir="rtl"] .user-btn {
  @media (min-width: 960px) {
    margin-right: 8px;
  }
  margin-left: 0;
}

@media (max-width: 959px) {
  .breadcrumbs {
    display: none;
  }
}

/* Align with dashboard layout: mobile = max-width 959px (same as DashboardNav / dashboard.vue) */
.nav-hamburger {
  display: none;
}

@media (max-width: 959px) {
  .nav-hamburger {
    display: inline-flex;
  }
}
</style>
