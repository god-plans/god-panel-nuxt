<template>
  <div class="dashboard-content" :style="contentStyles">
    <div
      class="dashboard-content__inner"
      :class="innerClass"
    >
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  maxWidth?: string
  disablePadding?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  maxWidth: 'lg',
  disablePadding: false
})

const settingsStore = useSettingsStore()

const maxWidthClass: Record<string, string> = {
  sm: 'max-w-screen-sm',
  md: 'max-w-screen-md',
  lg: 'max-w-screen-lg',
  xl: 'max-w-screen-xl',
}

/** Centered column: max-width + padding so pages are not stuck to the left on wide viewports */
const innerClass = computed(() => {
  if (props.disablePadding) {
    return ['w-full max-w-none px-0']
  }
  const mw = maxWidthClass[props.maxWidth] ?? 'max-w-screen-lg'
  const compact = settingsStore.settings.compactLayout
  const pad = compact ? 'px-4 sm:px-5 lg:px-6' : 'px-4 sm:px-6 lg:px-10'
  return ['w-full', mw, pad]
})

const contentStyles = computed(() => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column' as const,
  alignItems: 'center',
  minWidth: 0,
  width: '100%',
  paddingTop: 'var(--layout-dashboard-content-pt)',
  paddingBottom: 'var(--layout-dashboard-content-pb)',
  ...(props.disablePadding && {
    padding: '0 !important'
  })
}))
</script>

<style scoped>
.dashboard-content {
  box-sizing: border-box;
}

.dashboard-content__inner {
  box-sizing: border-box;
}

@media (max-width: 959px) {
  .dashboard-content__inner {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}
</style>
