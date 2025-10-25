<template>
  <div>
    <!-- Progress Bar -->
    <ProgressBar :is-loading="isLoading" :progress="loadingProgress" />

    <!-- Motion Lazy Container -->
    <MotionLazy>
    <!-- Mobile Navigation -->
    <DashboardNavMobile
      v-model="mobileNavOpen"
      @close="closeMobileNav"
    />

    <!-- Layout Section -->
    <div class="flex min-h-screen transition-all duration-[120ms] ease-linear" :class="{
      'lg:pl-[var(--layout-nav-width)]': !isHorizontalLayout && !mobile && !isMiniLayout,
      'lg:pl-[88px]': !isHorizontalLayout && !mobile && isMiniLayout,
      'lg:pr-[var(--layout-nav-width)] lg:pl-0': settingsStore.settings.direction === 'rtl' && !isHorizontalLayout && !mobile && !isMiniLayout,
      'lg:pr-[88px] lg:pl-0': settingsStore.settings.direction === 'rtl' && !isHorizontalLayout && !mobile && isMiniLayout,
      'px-4': mobile
    }" :style="layoutVars">
    <!-- Navigation Sidebar -->
    <DashboardNav
      v-if="!isHorizontalLayout && !mobile"
      :mini="isMiniLayout"
      class="hidden lg:block fixed top-0 h-screen z-20"
      :class="{
        'left-0': settingsStore.settings.direction !== 'rtl',
        'right-0': settingsStore.settings.direction === 'rtl'
      }"

      @toggle-mini="toggleNav"
      @open-mobile="openMobileNav"
    />

    <!-- Top Navigation for Horizontal Layout and Mobile -->
    <DashboardHeader
      :is-horizontal="isHorizontalLayout"
      :is-mobile="mobile"
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
  '--layout-nav-width': settingsStore.settings.compactLayout ? '260px' : '300px',
  '--layout-transition-duration': '120ms'
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
/* RTL Support */
[dir="rtl"] {
  direction: rtl;
}
</style>
