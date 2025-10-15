<template>
  <v-btn
    variant="outlined"
    :class="{ 'base-option--selected': selected }"
    class="base-option"
    @click="handleClick"
  >
    <div class="base-option__content">
      <div class="base-option__icon">
        <v-icon>{{ getIcon(icon) }}</v-icon>
      </div>

      <div class="base-option__text">
        <div class="base-option__label">{{ label }}</div>
        <v-switch
          :model-value="selected"
          readonly
          hide-details
          density="compact"
          class="base-option__switch"
        />
      </div>

      <v-tooltip v-if="tooltip" location="top">
        <template #activator="{ props }">
          <v-icon v-bind="props" size="16" class="base-option__info">
            mdi-information-outline
          </v-icon>
        </template>
        {{ tooltip }}
      </v-tooltip>
    </div>
  </v-btn>
</template>

<script setup lang="ts">
interface Props {
  icon: string
  label: string
  selected?: boolean
  tooltip?: string
}

const props = withDefaults(defineProps<Props>(), {
  selected: false
})

const emit = defineEmits<{
  click: []
}>()

const handleClick = () => {
  emit('click')
}

const getIcon = (icon: string) => {
  const iconMap: Record<string, string> = {
    moon: 'mdi-weather-night',
    contrast: 'mdi-contrast',
    'align-right': 'mdi-format-textdirection-r-to-l',
    'autofit-width': 'mdi-arrow-expand-horizontal'
  }
  return iconMap[icon] || `mdi-${icon}`
}
</script>

<style scoped>
.base-option {
  width: 100%;
  height: 80px;
  padding: 16px;
  border-radius: 12px;
  border: 1px solid rgb(var(--v-theme-surface-variant));
  background: rgb(var(--v-theme-surface));
  transition: all 0.2s ease;
}

.base-option:hover {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary-rgb), 0.04);
}

.base-option--selected {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary-rgb), 0.08);
}

.base-option__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 12px;
}

.base-option__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgb(var(--v-theme-surface-variant));
  color: rgb(var(--v-theme-on-surface-variant));
}

.base-option--selected .base-option__icon {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-primary-light)));
  color: rgb(var(--v-theme-on-primary));
}

.base-option__text {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.base-option__label {
  font-weight: 600;
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface));
  transition: color 0.2s ease;
}

.base-option--selected .base-option__label {
  color: rgb(var(--v-theme-primary));
}

.base-option__switch {
  margin-left: auto;
}

.base-option__info {
  opacity: 0.6;
  cursor: help;
}
</style>
