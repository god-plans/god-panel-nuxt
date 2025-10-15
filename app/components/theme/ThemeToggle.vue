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
        :color="settingsStore.settings.colorScheme === 'dark' ? 'warning' : 'primary'"
        variant="text"
        size="small"
        @click="settingsStore.onOpenDrawer"
      >
        <v-icon>
          {{ settingsStore.settings.colorScheme === 'dark' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
        </v-icon>
      </v-btn>
    </template>

    <v-card width="300" class="theme-menu">
      <v-card-title class="text-h6">
        Quick Theme Settings
      </v-card-title>

      <v-card-text>
        <!-- Theme Mode Toggle -->
        <div class="menu-item">
          <span class="item-label">Theme Mode</span>
          <v-btn-toggle
            v-model="colorScheme"
            mandatory
            size="small"
          >
            <v-btn value="light" variant="outlined">
              <v-icon class="me-1">mdi-weather-sunny</v-icon>
              Light
            </v-btn>
            <v-btn value="dark" variant="outlined">
              <v-icon class="me-1">mdi-weather-night</v-icon>
              Dark
            </v-btn>
          </v-btn-toggle>
        </div>

        <!-- Direction Toggle -->
        <div class="menu-item">
          <span class="item-label">Direction</span>
          <v-btn-toggle
            v-model="direction"
            mandatory
            size="small"
          >
            <v-btn value="ltr" variant="outlined">LTR</v-btn>
            <v-btn value="rtl" variant="outlined">RTL</v-btn>
          </v-btn-toggle>
        </div>

        <!-- Primary Colors -->
        <div class="menu-item">
          <span class="item-label">Primary Color</span>
          <div class="color-swatches">
            <button
              v-for="(color, key) in primaryColors"
              :key="key"
              class="color-swatch"
              :class="{ active: settingsStore.settings.primaryColor === key }"
              :style="{ backgroundColor: `rgb(var(--v-theme-${key === 'default' ? 'primary' : key}))` }"
              @click="settingsStore.settings.primaryColor = key"
            >
              <v-icon v-if="settingsStore.settings.primaryColor === key" size="16" color="white">
                mdi-check
              </v-icon>
            </button>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn
          variant="text"
          @click="menu = false"
        >
          Close
        </v-btn>
        <v-btn
          color="primary"
          variant="text"
          to="/dashboard/settings"
          @click="menu = false"
        >
          Full Settings
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-menu>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSettingsStore } from '~/stores/settings'

const settingsStore = useSettingsStore()
const menu = ref(false)

// Computed properties for v-model bindings
const colorScheme = computed({
  get: () => settingsStore.settings.colorScheme,
  set: (value: 'light' | 'dark') => settingsStore.updateField('colorScheme', value)
})

const direction = computed({
  get: () => settingsStore.settings.direction,
  set: (value: 'ltr' | 'rtl') => settingsStore.updateField('direction', value)
})

// Primary color options
const primaryColors = ref({
  default: 'Default',
  cyan: 'Cyan',
  purple: 'Purple',
  blue: 'Blue',
  orange: 'Orange',
  red: 'Red',
})
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
