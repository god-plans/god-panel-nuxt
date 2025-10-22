<template>
  <v-container
    class="dashboard-content"
    :fluid="!settingsStore.settings.compactLayout"
    :max-width="settingsStore.settings.compactLayout ? maxWidth : undefined"
    :style="contentStyles"
  >
    <slot />
  </v-container>
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

/* Mobile adjustments */
@media (max-width: 959px) {
  .dashboard-content {
    padding-left: 8px !important;
    padding-right: 8px !important;
    padding-top: var(--layout-dashboard-content-pt) !important;
    padding-bottom: var(--layout-dashboard-content-pb) !important;
  }

  /* Override any Vuetify container padding on mobile */
  .dashboard-content .v-container {
    padding-left: 8px !important;
    padding-right: 8px !important;
  }
}
</style>
