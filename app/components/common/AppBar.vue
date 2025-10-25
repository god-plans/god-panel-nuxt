<template>
  <v-app-bar
    color="transparent"
    elevation="0"
    class="main-app-bar"
  >
    <!-- Logo -->
    <v-img
      src="/logo-full.svg"
      width="120"
      class="cursor-pointer"
      contain
    />

    <v-spacer />

    <!-- Navigation Links -->
    <div class="hidden md:flex gap-2">
      <v-btn
        v-for="link in navLinks"
        :key="link.key"
        :to="link.path"
        variant="text"
        class="nav-link"
        :class="{ 'nav-link-active': isActive(link.path) }"
      >
        {{ link.title }}
      </v-btn>
    </div>

    <!-- Theme Toggle -->
    <v-btn
      icon
      @click="toggleTheme"
      class="theme-toggle"
    >
      <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>

    <!-- Mobile Menu -->
    <v-menu offset-y>
      <template #activator="{ props }">
        <v-btn
          icon
          v-bind="props"
          class="md:hidden ml-2"
        >
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item
          v-for="link in navLinks"
          :key="link.key"
          :to="link.path"
          @click="close"
        >
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useColorMode } from '@nuxtjs/color-mode'

const route = useRoute()
const colorMode = useColorMode()

interface NavLink {
  key: string
  title: string
  path: string
}

// Navigation links
const navLinks = ref<NavLink[]>([
  {
    key: 'home',
    title: 'Home',
    path: '/'
  },
  {
    key: 'features',
    title: 'Features',
    path: '/#features'
  },
  {
    key: 'pricing',
    title: 'Pricing',
    path: '/pricing'
  },
  {
    key: 'contact',
    title: 'Contact',
    path: '/contact'
  }
])

// Computed properties
const isActive = (path: string) => {
  return route.path === path
}

const isDark = computed(() => colorMode.preference === 'dark')

// Methods
const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<style scoped>
.main-app-bar {
  @apply border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900;
}

.nav-link {
  @apply normal-case font-medium;
}

.nav-link-active {
  @apply bg-blue-600 text-white;
}

.theme-toggle {
  @apply ml-2;
}
</style>
