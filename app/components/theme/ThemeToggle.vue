<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    location="bottom end"
    offset="8"
  >
    <template #activator="{ props }">
      <v-btn
        icon
        v-bind="props"
        :color="
          settingsStore.settings.colorScheme === 'dark' ? 'warning' : 'primary'
        "
        variant="text"
        size="small"
        @click="settingsStore.onOpenDrawer"
      >
        <v-icon> mdi-settings </v-icon>
      </v-btn>
    </template>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useSettingsStore } from "~/stores/settings";

const settingsStore = useSettingsStore();
const menu = ref(false);

// Computed properties for v-model bindings
const colorScheme = computed({
  get: () => settingsStore.settings.colorScheme,
  set: (value: "light" | "dark") =>
    settingsStore.updateField("colorScheme", value),
});

const direction = computed({
  get: () => settingsStore.settings.direction,
  set: (value: "ltr" | "rtl") => settingsStore.updateField("direction", value),
});

// Primary color options
const primaryColors = ref({
  default: "Default",
  cyan: "Cyan",
  purple: "Purple",
  blue: "Blue",
  orange: "Orange",
  red: "Red",
});
</script>

<style scoped>
.theme-menu {
  border-radius: 12px;
}

.menu-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
  gap: 12px;
}

.item-label {
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  font-size: 14px;
  min-width: 100px;
}

.color-swatches {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.color-swatch {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  border: 2px solid rgb(var(--v-theme-surface-variant));
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.color-swatch:hover {
  transform: scale(1.1);
  border-color: rgb(var(--v-theme-primary));
}

.color-swatch.active {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary-rgb), 0.3);
}

/* Responsive */
@media (max-width: 480px) {
  .theme-menu {
    width: 280px;
  }

  .menu-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }

  .item-label {
    min-width: auto;
  }
}
</style>
