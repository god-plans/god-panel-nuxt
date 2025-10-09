<template>
  <v-app-bar
    color="primary"
    dark
    elevation="0"
    class="dashboard-header"
  >
    <!-- Mobile menu button -->
    <v-app-bar-nav-icon
      v-if="mobile"
      @click="$emit('toggle-nav')"
      class="d-lg-none"
    />

    <!-- Logo for mobile -->
    <v-img
      v-if="mobile"
      src="/logo-single.png"
      width="32"
      height="32"
      class="mr-3 d-lg-none"
      contain
    />

    <v-spacer />

    <!-- Search -->
    <v-text-field
      v-model="searchQuery"
      placeholder="Search..."
      variant="solo"
      density="comfortable"
      prepend-inner-icon="mdi-magnify"
      class="search-field"
      hide-details
      single-line
    />

    <!-- Notifications -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          class="notification-btn"
        >
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

      <v-list class="notification-list">
        <v-list-item v-if="notifications.length === 0">
          <v-list-item-title>No new notifications</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-for="notification in notifications.slice(0, 5)"
          :key="notification.id"
          @click="markAsRead(notification.id)"
        >
          <template #prepend>
            <v-avatar size="32">
              <v-icon :color="notification.color">{{ notification.icon }}</v-icon>
            </v-avatar>
          </template>
          <v-list-item-title>{{ notification.title }}</v-list-item-title>
          <v-list-item-subtitle>{{ notification.message }}</v-list-item-subtitle>
        </v-list-item>

        <v-divider v-if="notifications.length > 0" />
        <v-list-item v-if="notifications.length > 0" @click="viewAllNotifications">
          <v-list-item-title class="text-primary">View all notifications</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- User menu -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          class="user-btn"
        >
          <v-avatar size="32">
            <img
              :src="authStore.user?.photoURL || '/placeholder.svg'"
              :alt="authStore.displayName"
            />
          </v-avatar>
        </v-btn>
      </template>

      <v-list class="user-menu">
        <v-list-item>
          <template #prepend>
            <v-avatar size="40">
              <img
                :src="authStore.user?.photoURL || '/placeholder.svg'"
                :alt="authStore.displayName"
              />
            </v-avatar>
          </template>
          <v-list-item-title>{{ authStore.displayName }}</v-list-item-title>
          <v-list-item-subtitle>{{ authStore.userEmail }}</v-list-item-subtitle>
        </v-list-item>

        <v-divider />

        <v-list-item @click="goToProfile">
          <template #prepend>
            <v-icon>mdi-account</v-icon>
          </template>
          <v-list-item-title>Profile</v-list-item-title>
        </v-list-item>

        <v-list-item @click="goToSettings">
          <template #prepend>
            <v-icon>mdi-cog</v-icon>
          </template>
          <v-list-item-title>Settings</v-list-item-title>
        </v-list-item>

        <v-divider />

        <v-list-item @click="handleLogout">
          <template #prepend>
            <v-icon>mdi-logout</v-icon>
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

interface Props {
  mobile?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  mobile: false
})

defineEmits<{
  'toggle-nav': []
}>()

const router = useRouter()
const authStore = useAuthStore()

// Reactive data
const searchQuery = ref('')

// Mock notifications - in real app, this would come from API
const notifications = ref([
  {
    id: 1,
    title: 'New order received',
    message: 'Order #1234 has been placed',
    icon: 'mdi-shopping-cart',
    color: 'success',
    read: false
  },
  {
    id: 2,
    title: 'Payment failed',
    message: 'Payment for order #1233 failed',
    icon: 'mdi-credit-card-off',
    color: 'error',
    read: false
  },
  {
    id: 3,
    title: 'New user registered',
    message: 'John Doe joined your platform',
    icon: 'mdi-account-plus',
    color: 'info',
    read: false
  }
])

// Methods
const markAsRead = (id: number) => {
  const notification = notifications.value.find(n => n.id === id)
  if (notification) {
    notification.read = true
  }
}

const viewAllNotifications = () => {
  router.push('/dashboard/notifications')
}

const goToProfile = () => {
  router.push('/dashboard/profile')
}

const goToSettings = () => {
  router.push('/dashboard/settings')
}

const handleLogout = async () => {
  await authStore.logout()
  await router.push('/auth/login')
}
</script>

<style scoped>
.dashboard-header {
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);
}

.search-field {
  max-width: 300px;
  margin-right: 16px;
}

.notification-btn,
.user-btn {
  margin-left: 8px;
}

.notification-list {
  min-width: 320px;
}

.user-menu {
  min-width: 250px;
}

@media (max-width: 768px) {
  .search-field {
    display: none;
  }
}
</style>
