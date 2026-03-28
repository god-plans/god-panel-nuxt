<template>
  <header
    class="main-app-bar flex items-center gap-4 px-4 py-3 border-b"
    :style="{
      borderColor: 'var(--gk-color-border)',
      background: 'var(--gk-color-surface)',
    }"
  >
    <Logo variant="compact" size="md" class="logo cursor-pointer" />

    <div class="flex-1" />

    <nav class="hidden md:flex items-center gap-2">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.key"
        :to="link.path"
        class="nav-link px-3 py-2 rounded-lg text-sm font-medium"
        :class="{ 'nav-link-active': isActive(link.path) }"
      >
        {{ link.title }}
      </NuxtLink>
    </nav>

    <GkButton variant="ghost" slim class="theme-toggle" @click="toggleTheme">
      <AppIcon :name="isDark ? 'weather-sunny' : 'weather-night'" :size="22" />
    </GkButton>

    <GkMenu v-model="mobileOpen" placement="bottom-end" class="md:hidden">
      <template #activator="{ props: act }">
        <GkButton v-bind="act" variant="ghost" slim class="mobile-menu">
          <AppIcon name="menu" :size="22" />
        </GkButton>
      </template>
      <ul class="list-none p-0 m-0 min-w-[200px]">
        <li v-for="link in navLinks" :key="link.key">
          <NuxtLink
            :to="link.path"
            class="block px-3 py-2 rounded-md hover:bg-[var(--gk-color-surface-muted)]"
            @click="mobileOpen = false"
          >
            {{ link.title }}
          </NuxtLink>
        </li>
      </ul>
    </GkMenu>
  </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { GkButton, GkMenu } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'
import Logo from '~/components/common/Logo.vue'

const route = useRoute()
const colorMode = useColorMode()
const mobileOpen = ref(false)

interface NavLink {
  key: string
  title: string
  path: string
}

const navLinks = ref<NavLink[]>([
  { key: 'home', title: 'Home', path: '/' },
  { key: 'features', title: 'Features', path: '/#features' },
  { key: 'pricing', title: 'Pricing', path: '/pricing' },
  { key: 'contact', title: 'Contact', path: '/contact' },
])

const isActive = (path: string) => route.path === path

const isDark = computed(() => colorMode.preference === 'dark')

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<style scoped>
.nav-link {
  color: var(--gk-color-on-surface);
  text-decoration: none;
}

.nav-link-active {
  background: var(--gk-color-primary);
  color: var(--gk-color-text-on-primary);
}
</style>
