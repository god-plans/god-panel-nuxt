<template>
  <div class="nav-options">
    <div class="nav-options__header">
      <span class="nav-options__title">Nav</span>
      <v-tooltip v-if="tooltip" location="top">
        <template #activator="{ props }">
          <v-icon v-bind="props" size="14" class="nav-options__info">mdi-information-outline</v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </div>

    <div class="nav-options__content">
      <!-- Layout Options -->
      <div v-if="!hideNavLayout" class="nav-section">
        <div class="nav-section__label">Layout</div>
        <div class="layout-options">
          <LayoutOption
            v-for="layout in options.layouts"
            :key="layout"
            :option="layout"
            :selected="value.layout === layout"
            @click="handleLayoutClick(layout)"
          />
        </div>
      </div>

      <!-- Color Options -->
      <div v-if="!hideNavColor" class="nav-section">
        <div class="nav-section__label">Color</div>
        <div class="color-options">
          <ColorOption
            v-for="color in options.colors"
            :key="color"
            :option="color"
            :selected="value.color === color"
            @click="handleColorClick(color)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import LayoutOption from './LayoutOption.vue'
import ColorOption from './ColorOption.vue'

interface Props {
  value: {
    color: string
    layout: string
  }
  options: {
    colors: string[]
    layouts: string[]
  }
  hideNavColor?: boolean
  hideNavLayout?: boolean
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  hideNavColor: false,
  hideNavLayout: false,
  tooltip: 'Dashboard only'
})

const emit = defineEmits<{
  'click-option': [{
    color?: string
    layout?: string
  }]
}>()

const handleLayoutClick = (layout: string) => {
  emit('click-option', { layout })
}

const handleColorClick = (color: string) => {
  emit('click-option', { color })
}
</script>

<style scoped>
.nav-options {
  padding: 16px 0 16px 16px;
  border: 1px solid rgb(var(--v-theme-surface-variant));
  border-radius: 12px;
  position: relative;
}

.nav-options__header {
  position: absolute;
  top: -12px;
  left: 16px;
  background: rgb(var(--v-theme-surface));
  padding: 0 8px;
  display: flex;
  align-items: center;
  gap: 4px;
}

.nav-options__title {
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
  padding: 4px 8px;
  border-radius: 11px;
  border: 1px solid rgb(var(--v-theme-surface-variant));
}

.nav-options__info {
  opacity: 0.6;
  cursor: help;
}

.nav-options__content {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 8px;
}

.nav-section {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-section__label {
  font-size: 11px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface-variant));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.layout-options,
.color-options {
  display: flex;
  gap: 12px;
}
</style>
