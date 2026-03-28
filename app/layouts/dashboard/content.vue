<template>
  <div
    class="dashboard-content mx-auto w-full"
    :class="containerClass"
    :style="contentStyles"
  >
    <slot />
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

const containerClass = computed(() => {
  const fluid = !settingsStore.settings.compactLayout
  const mw = maxWidthClass[props.maxWidth] ?? 'max-w-screen-lg'
  return [
    fluid ? 'px-4 sm:px-6 lg:px-10' : '',
    !fluid ? mw : '',
  ].filter(Boolean)
})

const contentStyles = computed(() => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column' as const,
  paddingTop: 'var(--layout-dashboard-content-pt)',
  paddingBottom: 'var(--layout-dashboard-content-pb)',
  ...(props.disablePadding && {
    padding: '0 !important'
  })
}))
</script>

<style scoped>
.dashboard-content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}

@media (max-width: 959px) {
  .dashboard-content {
    padding-left: 8px !important;
    padding-right: 8px !important;
    padding-top: var(--layout-dashboard-content-pt) !important;
    padding-bottom: var(--layout-dashboard-content-pb) !important;
  }
}
</style>
