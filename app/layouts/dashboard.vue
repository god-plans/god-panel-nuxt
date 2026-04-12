<template>
  <div>
    <!-- Progress Bar -->
    <ProgressBar :is-loading="isLoading" :progress="loadingProgress" />

    <!-- Nav drawers must stay outside MotionLazy: that wrapper uses transform, which breaks position:fixed (drawer would scroll away). -->
    <DashboardNavMobile
      v-model:open="mobileNavOpen"
      @close="closeMobileNav"
    />

    <DashboardNav
      v-if="!isHorizontalLayout && !mobile"
      :mini="isMiniLayout"
      class="lg:block "
      @toggle-mini="toggleNav"
    />

    <!-- Motion Lazy Container (main column only — see nav comment above) -->
    <MotionLazy>
    <!-- Layout Section -->
    <div
      class="dashboard-layout"
      :class="{
        'compact-mode': settingsStore.settings.compactLayout,
        'rtl-mode': settingsStore.settings.direction === 'rtl',
        'dashboard-layout--nav-vertical': !isHorizontalLayout && !mobile && !isMiniLayout,
        'dashboard-layout--nav-mini': !isHorizontalLayout && !mobile && isMiniLayout,
      }"
      :style="layoutVars"
    >
    <!-- Header spans the full width above main content (beside sidebar), not between nav and content columns -->
    <div class="dashboard-main-area panel-page">
      <DashboardHeader
        :is-horizontal="isHorizontalLayout"
        :is-mobile="mobile"
        @toggle-nav="openMobileNav"
      />

      <DashboardMain :is-nav-horizontal="isHorizontalLayout">
        <DashboardContent max-width="xl">
          <slot />
        </DashboardContent>
      </DashboardMain>
    </div>
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

// Mobile detection
const mobile = ref(false)
onMounted(() => {
  const checkMobile = () => {
    mobile.value = window.innerWidth < 960
  }
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

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
  flex-direction: row;
  min-height: 100vh;
  transition: all var(--layout-transition-duration) var(--layout-transition-easing);
}

/* Column: top bar + scrollable main (sidebar is position:fixed and does not consume flex width) */
.dashboard-main-area {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
  min-height: 100vh;
  min-height: 100dvh;
}

/* Sidebar is a sibling (not inside this div); reserve space for fixed nav */
.dashboard-layout--nav-vertical {
  padding-left: var(--layout-nav-vertical-width);
}

.dashboard-layout--nav-mini {
  padding-left: var(--layout-nav-mini-width);
}

/* RTL mode adjustments */
.rtl-mode.dashboard-layout--nav-vertical {
  padding-left: 0;
  padding-right: var(--layout-nav-vertical-width);
}

.rtl-mode.dashboard-layout--nav-mini {
  padding-left: 0;
  padding-right: var(--layout-nav-mini-width);
}

/* Compact mode adjustments */
.compact-mode {
  --layout-spacing-reduced: 0.75;
}

.compact-mode .dashboard-layout--nav-vertical {
  padding-left: var(--layout-nav-vertical-width);
}

.compact-mode .dashboard-layout--nav-mini {
  padding-left: var(--layout-nav-mini-width);
}

/* Compact + RTL mode adjustments */
.compact-mode.rtl-mode.dashboard-layout--nav-vertical {
  padding-left: 0;
  padding-right: var(--layout-nav-vertical-width);
}

.compact-mode.rtl-mode.dashboard-layout--nav-mini {
  padding-left: 0;
  padding-right: var(--layout-nav-mini-width);
}

@media (max-width: 959px) {
  /* Vertical nav is not shown; main column uses full width with page gutters */
  .dashboard-layout {
    padding-left: 16px !important;
    padding-right: 16px !important;
  }

  /* Ensure proper spacing on mobile for all layout items */
  .dashboard-layout > * {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}
</style>
