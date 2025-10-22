<template>
  <div>
    <!-- Progress Bar -->
    <ProgressBar :is-loading="isLoading" :progress="loadingProgress" />

    <!-- Motion Lazy Container -->
    <MotionLazy>
    <!-- Mobile Navigation -->
    <DashboardNavMobile
      v-model:open="mobileNavOpen"
      @close="closeMobileNav"
    />

    <!-- Layout Section -->
    <div class="dashboard-layout" :class="{ 'compact-mode': settingsStore.settings.compactLayout, 'rtl-mode': settingsStore.settings.direction === 'rtl' }" :style="layoutVars">
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

   
    </MotionLazy>
  </div>
</template>

<script setup lang="ts">
import DashboardMain from '~/layouts/dashboard/main.vue'
import DashboardContent from '~/layouts/dashboard/content.vue'
import DashboardNav from '~/components/dashboard/DashboardNav.vue'
import DashboardNavMobile from '~/components/dashboard/DashboardNavMobile.vue'
import DashboardHeader from '~/components/dashboard/DashboardHeader.vue'
import ProgressBar from '~/components/common/ProgressBar.vue'
import MotionLazy from '~/components/common/MotionLazy.vue'
import { useSettingsStore } from '~/stores/settings'
import { useRouter } from 'vue-router'
import { ref, computed, onMounted } from 'vue'

const settingsStore = useSettingsStore()
const mobileNavOpen = ref(false)

// Loading states for progress bar
const isLoading = ref(false)
const loadingProgress = ref(0)

const isHorizontalLayout = computed(() => settingsStore.settings.navLayout === 'horizontal')
const isMiniLayout = computed(() => settingsStore.settings.navLayout === 'mini')

const layoutVars = computed(() => ({
  '--layout-transition-easing': 'linear',
  '--layout-transition-duration': '120ms',
  '--layout-nav-mini-width': '88px',
  '--layout-nav-vertical-width': settingsStore.settings.compactLayout ? '260px' : '300px',
  '--layout-nav-horizontal-height': settingsStore.settings.compactLayout ? '56px' : '64px',
  '--layout-dashboard-content-pt': settingsStore.settings.compactLayout ? '4px' : '8px',
  '--layout-dashboard-content-pb': settingsStore.settings.compactLayout ? '32px' : '64px',
  '--layout-dashboard-content-px': settingsStore.settings.compactLayout ? '24px' : '40px'
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

// Route loading simulation
const router = useRouter()
let progressInterval: NodeJS.Timeout | null = null

const startLoading = () => {
  isLoading.value = true
  loadingProgress.value = 0

  progressInterval = setInterval(() => {
    loadingProgress.value += Math.random() * 15
    if (loadingProgress.value >= 90) {
      if (progressInterval) clearInterval(progressInterval)
    }
  }, 100)
}

const completeLoading = () => {
  loadingProgress.value = 100
  setTimeout(() => {
    isLoading.value = false
    loadingProgress.value = 0
  }, 200)
}

// Watch for route changes
onMounted(() => {
  router.beforeEach(() => {
    startLoading()
  })

  router.afterEach(() => {
    completeLoading()
  })
})
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

/* RTL mode adjustments */
.rtl-mode.dashboard-layout:has(.has-sidebar) {
  padding-left: 0;
  padding-right: var(--layout-nav-vertical-width);
}

.rtl-mode.dashboard-layout:has(.nav-mini) .has-sidebar {
  padding-left: 0;
  padding-right: var(--layout-nav-mini-width);
}

/* Compact mode adjustments */
.compact-mode {
  --layout-spacing-reduced: 0.75;
}

.compact-mode .dashboard-layout:has(.has-sidebar) {
  padding-left: var(--layout-nav-vertical-width);
}

.compact-mode .dashboard-layout:has(.nav-mini) .has-sidebar {
  padding-left: var(--layout-nav-mini-width);
}

/* Compact + RTL mode adjustments */
.compact-mode.rtl-mode.dashboard-layout:has(.has-sidebar) {
  padding-left: 0;
  padding-right: var(--layout-nav-vertical-width);
}

.compact-mode.rtl-mode.dashboard-layout:has(.nav-mini) .has-sidebar {
  padding-left: 0;
  padding-right: var(--layout-nav-mini-width);
}

@media (max-width: 768px) {
  .dashboard-layout {
    padding-left: 0;
    padding-right: 0;
  }

  .rtl-mode.dashboard-layout {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
