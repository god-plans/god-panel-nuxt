<template>
  <v-btn
    icon
    variant="text"
    size="small"
    aria-label="Open settings"
    title="Open settings"
    @click="settingsStore.onOpenDrawer"
  >
    <v-icon>mdi-cog</v-icon>
  </v-btn>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()
</script>
