<template>
  <GkButton
    variant="ghost"
    slim
    aria-label="Open settings"
    title="Open settings"
    @click="settingsStore.onOpenDrawer"
  >
    <AppIcon name="cog" :size="22" />
  </GkButton>
</template>

<script setup lang="ts">
import { GkButton } from "god-kit/vue";
import { useSettingsStore } from "~/stores/settings";
import AppIcon from "~/components/ui/AppIcon.vue";

const settingsStore = useSettingsStore();
</script>
