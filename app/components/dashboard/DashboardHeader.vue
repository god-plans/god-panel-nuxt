<template>
  <v-app-bar
    color="surface"
    elevation="0"
    class="dashboard-header border-b border-outline"
  > 
    <!-- Mobile menu button -->
    <v-app-bar-nav-icon
      @click="$emit('toggle-nav')"
      class="lg:hidden"
    />

    <!-- Logo for mobile -->
    <v-img
      v-if="mobile"
      src="/logo-single.png"
      width="32"
      height="32"
      class="mr-3 lg:hidden"
      contain
    />

    <!-- Breadcrumbs for desktop -->
    <div v-if="!mobile" class="ml-4">
      <v-breadcrumbs :items="breadcrumbItems">
        <template #item="{ item }">
          <v-breadcrumbs-item
            :to="item.to"
            :disabled="item.disabled"
            class="breadcrumb-item"
          >
            {{ item.title }}
          </v-breadcrumbs-item>
        </template>
      </v-breadcrumbs>
    </div>

    <v-spacer />

    <!-- Search -->
    <!-- <v-text-field
      v-model="searchQuery"
      :placeholder="t('settings.search')"
      variant="outlined"
      density="comfortable"
      class="search-field"
      hide-details
      single-line
      prepend-inner-icon="mdi-magnify"
      
    >
    </v-text-field> -->

    <!-- Language Switcher -->
    <LanguageSwitcher />
    <!-- Settings Button -->
    <SettingsButton />

    <!-- Notifications -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="ml-2 text-on-surface hover:bg-on-surface/8">
          <v-badge
            :content="notifications.length"
            :value="notifications.length > 0"
            color="error"
            overlap
          >
            <v-icon>mdi-bell</v-icon>
          </v-badge>
        </v-btn>
      </template>

      <v-list class="bg-surface border border-outline rounded-lg">
        <v-list-item v-if="notifications.length === 0">
          <v-list-item-title>{{
            t("settings.noNewNotifications")
          }}</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-for="notification in notifications.slice(0, 5)"
          :key="notification.id"
          @click="markAsRead(notification.id)"
        >
          <template #prepend>
            <v-avatar size="32">
              <v-icon :color="notification.color">{{
                notification.icon
              }}</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>{{ notification.title }}</v-list-item-title>
          <v-list-item-subtitle>{{
            notification.message
          }}</v-list-item-subtitle>
        </v-list-item>

        <v-divider v-if="notifications.length > 0" />
        <v-list-item
          v-if="notifications.length > 0"
          @click="viewAllNotifications"
        >
          <v-list-item-title class="text-blue-600 dark:text-blue-400">{{
            t("settings.viewAllNotifications")
          }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- User menu -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn icon v-bind="props" class="ml-2 text-on-surface hover:bg-on-surface/8">
          <v-avatar size="32">
            <img
              :src="authStore.user?.photoURL || '/assets/images/avatar.webp'"
              :alt="authStore.displayName"
            />
          </v-avatar>
        </v-btn>
      </template>

      <v-list class="bg-surface border border-outline rounded-lg">
        <v-list-item>
          <template #prepend>
            <v-avatar size="40">
              <img
                :src="authStore.user?.photoURL || '/assets/images/avatar.webp'"
                :alt="authStore.displayName"
              />
            </v-avatar>
          </template>
          <v-list-item-title>{{ authStore.displayName || 'Demo User' }}</v-list-item-title>
          <v-list-item-subtitle>{{ authStore.userEmail || 'demo@example.com' }}</v-list-item-subtitle>
        </v-list-item>

        <v-divider />

        <v-list-item @click="goToProfile">
          <template #prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title>{{ t("settings.profile") }}</v-list-item-title>
        </v-list-item>

        <v-list-item @click="goToSettings">
          <template #prepend>
            <v-icon>mdi-cog</v-icon>
          </template>
          <v-list-item-title>{{ t("common.settings") }}</v-list-item-title>
        </v-list-item>

        <v-divider />

        <v-list-item @click="handleLogout">
          <template #prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>{{ t("common.logout") }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Logout Confirmation Dialog -->
    <LogoutConfirmDialog v-model="showLogoutDialog" @confirm="performLogout" />
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter, useRoute } from "vue-router";
import { generateBreadcrumbs } from "~/utils/routes";
import { useAuthStore } from "~/stores/auth";
import SettingsButton from "~/components/theme/SettingsButton.vue";
import LanguageSwitcher from "~/components/theme/LanguageSwitcher.vue";
import LogoutConfirmDialog from "~/components/common/LogoutConfirmDialog.vue";

const { t } = useI18n();

interface Props {
  mobile?: boolean;
  isHorizontal?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  mobile: false,
  isHorizontal: false,
});

defineEmits<{
  "toggle-nav": [];
}>();

const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Reactive data
const searchQuery = ref("");
const showLogoutDialog = ref(false);

// Breadcrumbs
const breadcrumbItems = computed(() => {
  const breadcrumbs = generateBreadcrumbs(route.path);
  return breadcrumbs.map((crumb, index) => ({
    title: crumb.title.includes(".") ? t(crumb.title) : crumb.title,
    to: index === breadcrumbs.length - 1 ? undefined : crumb.path,
    disabled: index === breadcrumbs.length - 1,
  }));
});

// Mock notifications - in real app, this would come from API
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

// Methods
const markAsRead = (id: number) => {
  const notification = notifications.value.find((n) => n.id === id);
  if (notification) {
    notification.read = true;
  }
};

const viewAllNotifications = () => {
  router.push("/dashboard/notifications");
};

const goToProfile = () => {
  router.push("/dashboard/profile");
};

const goToSettings = () => {
  router.push("/dashboard/settings");
};

const handleLogout = () => {
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
  @apply bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100;
}

.breadcrumb-item {
  @apply text-gray-900 dark:text-gray-100 no-underline;
}

.breadcrumb-item:hover {
  @apply text-gray-900 dark:text-gray-100;
}

.search-field {
  @apply max-w-sm mr-4;
}

.search-field :deep(.v-field) {
  @apply bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600;
}

.search-field :deep(.v-field:hover) {
  @apply border-gray-400 dark:border-gray-500;
}

.search-field :deep(.v-field--focused) {
  @apply border-blue-600 dark:border-blue-400;
}

.search-field :deep(.v-field__input) {
  @apply text-gray-900 dark:text-gray-100;
}

.search-field :deep(.v-field__input::placeholder) {
  @apply text-gray-500 dark:text-gray-400;
}

.notification-list :deep(.v-list-item),
.user-menu :deep(.v-list-item) {
  @apply text-gray-900 dark:text-gray-100;
}

.notification-list :deep(.v-list-item:hover),
.user-menu :deep(.v-list-item:hover) {
  @apply bg-gray-100 dark:bg-gray-800;
}

/* RTL Support */
[dir="rtl"] .dashboard-header {
  direction: rtl;
}

[dir="rtl"] .dashboard-header .v-app-bar {
  @apply flex-row-reverse;
}

[dir="rtl"] .search-field {
  @apply ml-4 mr-0;
}

@media (max-width: 959px) {
  .search-field {
    @apply hidden;
  }
}
</style>
