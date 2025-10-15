<template>
  <!-- Mobile Navigation -->
  <DashboardNavMobile
    v-model:open="mobileNavOpen"
    @close="closeMobileNav"
  />

  <!-- Layout Section -->
  <div class="dashboard-layout" :style="layoutVars">
    <!-- Navigation Sidebar -->
    <DashboardNav
      v-if="!isHorizontalLayout"
      :mini="isMiniLayout"
      @toggle-mini="toggleNav"
      @open-mobile="openMobileNav"
    />

    <!-- Top Navigation for Horizontal Layout -->
    <DashboardHeader
   
      @toggle-nav="openMobileNav"
    />

    <!-- Main Content -->
    <DashboardMain :is-nav-horizontal="isHorizontalLayout">
      <DashboardContent max-width="xl">
        <slot />
      </DashboardContent>
    </DashboardMain>
  </div>

  <!-- Settings Drawer -->
  <SettingsDrawer />
</template>

<script setup lang="ts">
import DashboardMain from '~/layouts/dashboard/main.vue'
import DashboardContent from '~/layouts/dashboard/content.vue'
import DashboardNav from '~/components/dashboard/DashboardNav.vue'
import DashboardNavMobile from '~/components/dashboard/DashboardNavMobile.vue'
import DashboardHeader from '~/components/dashboard/DashboardHeader.vue'
import SettingsDrawer from '~/components/settings/drawer/SettingsDrawer.vue'

const settingsStore = useSettingsStore()
const mobileNavOpen = ref(false)

const isHorizontalLayout = computed(() => settingsStore.settings.navLayout === 'horizontal')
const isMiniLayout = computed(() => settingsStore.settings.navLayout === 'mini')

const layoutVars = computed(() => ({
  '--layout-transition-easing': 'linear',
  '--layout-transition-duration': '120ms',
  '--layout-nav-mini-width': '88px',
  '--layout-nav-vertical-width': '300px',
  '--layout-nav-horizontal-height': '64px',
  '--layout-dashboard-content-pt': '8px',
  '--layout-dashboard-content-pb': '64px',
  '--layout-dashboard-content-px': '40px'
}))

const toggleNav = () => {
  const newLayout = settingsStore.settings.navLayout === 'vertical' ? 'mini' : 'vertical'
  settingsStore.updateField('navLayout', newLayout)
}

const openMobileNav = () => {
  mobileNavOpen.value = true
}

const closeMobileNav = () => {
  mobileNavOpen.value = false
}
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  transition: all var(--layout-transition-duration) var(--layout-transition-easing);
}

.dashboard-layout:has(.has-sidebar) {
  padding-left: var(--layout-nav-vertical-width);
}

.dashboard-layout:has(.nav-mini) .has-sidebar {
  padding-left: var(--layout-nav-mini-width);
}

@media (max-width: 768px) {
  .dashboard-layout {
    padding-left: 0;
  }
}
</style>
