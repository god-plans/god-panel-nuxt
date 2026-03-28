<template>
  <button
    type="button"
    :class="{ 'base-option--selected': selected }"
    class="base-option"
    @click="handleClick"
  >
    <div class="base-option__top">
      <AppIcon class="base-option__icon" :name="getIcon(icon)" :size="24" />
      <GkCheckbox
        :model-value="selected"
        readonly
        class="base-option__switch"
        :aria-label="label"
      />
    </div>

    <div class="base-option__bottom">
      <span class="base-option__label">{{ label }}</span>
      <GkTooltip v-if="tooltip" :text="tooltip" placement="top">
        <template #activator="{ props: tip }">
          <span v-bind="tip" class="base-option__info inline-flex">
            <AppIcon name="information-outline" :size="16" />
          </span>
        </template>
      </GkTooltip>
    </div>
  </button>
</template>

<script setup lang="ts">
import { GkCheckbox, GkTooltip } from "god-kit/vue";
import AppIcon from "~/components/ui/AppIcon.vue";

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

const getIcon = (iconName: string) => {
  const iconMap: Record<string, string> = {
    moon: 'weather-night',
    contrast: 'contrast-circle',
    'align-right': 'format-align-right',
    'autofit-width': 'arrow-collapse-horizontal'
  }
  return iconMap[iconName] || 'circle'
}
</script>

<style scoped>
.base-option {
  width: 100%;
  padding: 16px;
  border-radius: 16px;
  border: 1px solid color-mix(in srgb, var(--gk-color-on-surface) 12%, transparent);
  background: transparent;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
}

.base-option:hover {
  background: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
}

.base-option--selected {
  background: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
}

.base-option__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.base-option__icon {
  opacity: 0.7;
}

.base-option__bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.base-option__label {
  font-weight: 600;
  font-size: 13px;
  line-height: 18px;
  color: var(--gk-color-on-surface);
  transition: color 0.2s ease;
}

.base-option__info {
  opacity: 0.6;
  cursor: help;
  color: var(--gk-color-on-surface);
}
</style>
