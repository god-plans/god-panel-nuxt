<template>
  <div
    class="dashboard-layout"
    :class="{
      'dashboard-layout--compact': settings.settings.compactLayout,
      'dashboard-layout--rtl': settings.isRtl,
      'dashboard-layout--nav-vertical': hasSidebar && !settings.isMiniLayout,
      'dashboard-layout--nav-mini': hasSidebar && settings.isMiniLayout,
    }"
    :style="layoutVars"
  >
    <!--
      Both navs are always rendered and shown/hidden with CSS. Deciding in JS
      would need the viewport width, which the server does not have — the layout
      would flip on hydration.
    -->
    <DashboardNavMobile v-model:open="mobileNavOpen" />

    <DashboardNav
      v-if="hasSidebar"
      :mini="settings.isMiniLayout"
      @toggle-mini="toggleMini"
    />

    <div class="dashboard-layout__main panel-page">
      <DashboardHeader @toggle-nav="mobileNavOpen = true" />

      <main class="dashboard-layout__content">
        <div class="dashboard-layout__inner">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import DashboardNav from '~/components/dashboard/DashboardNav.vue'
import DashboardNavMobile from '~/components/dashboard/DashboardNavMobile.vue'
import DashboardHeader from '~/components/dashboard/DashboardHeader.vue'

const settings = useSettingsStore()
const mobileNavOpen = ref(false)

const hasSidebar = computed(() => !settings.isHorizontalLayout)

function toggleMini() {
  settings.updateField('navLayout', settings.isMiniLayout ? 'vertical' : 'mini')
}

const layoutVars = computed(() => {
  const compact = settings.settings.compactLayout
  return {
    '--layout-nav-mini-width': '88px',
    '--layout-nav-vertical-width': compact ? '260px' : '300px',
    '--layout-content-pt': compact ? '16px' : '24px',
    '--layout-content-pb': compact ? '32px' : '48px',
    '--layout-content-px': compact ? '20px' : '32px',
  }
})
</script>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  min-height: 100dvh;
}

/* The sidebar is position:fixed, so it takes no flex width — reserve it here. */
.dashboard-layout--nav-vertical {
  padding-inline-start: var(--layout-nav-vertical-width);
}

.dashboard-layout--nav-mini {
  padding-inline-start: var(--layout-nav-mini-width);
}

.dashboard-layout__main {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 0;
}

.dashboard-layout__content {
  display: flex;
  flex: 1 1 auto;
  justify-content: center;
  min-width: 0;
  padding: var(--layout-content-pt) var(--layout-content-px) var(--layout-content-pb);
}

.dashboard-layout__inner {
  width: 100%;
  max-width: 1600px;
  min-width: 0;
}

/* Below the sidebar breakpoint the fixed nav is hidden (see dashboard-nav.css). */
@media (max-width: 959px) {
  .dashboard-layout--nav-vertical,
  .dashboard-layout--nav-mini {
    padding-inline-start: 0;
  }

  .dashboard-layout__content {
    padding-inline: 16px;
  }
}
</style>
