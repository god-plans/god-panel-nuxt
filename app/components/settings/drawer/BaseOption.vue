<template>
  <button
    type="button"
    :class="{ 'base-option--selected': selected }"
    class="base-option"
    @click="handleClick"
  >
    <div class="base-option__top">
      <span class="base-option__icon-wrap" aria-hidden="true">
        <AppIcon class="base-option__icon" :name="getIcon(icon)" :size="24" />
      </span>
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
  border-radius: var(--panel-radius-lg);
  border: 1px solid var(--panel-hairline);
  background: var(--panel-surface-elevated);
  box-shadow: var(--panel-shadow-card);
  transition:
    border-color 0.18s ease,
    box-shadow 0.18s ease,
    background 0.18s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
}

.base-option:hover {
  border-color: color-mix(in srgb, var(--gk-color-primary) 22%, var(--gk-color-border));
  box-shadow: var(--panel-shadow-card-hover);
}

.base-option--selected {
  background: color-mix(in srgb, var(--gk-color-primary) 11%, var(--gk-color-surface));
  border-color: color-mix(in srgb, var(--gk-color-primary) 28%, var(--gk-color-border));
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--gk-color-primary) 22%, transparent),
    var(--panel-shadow-card);
}

.base-option__top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.base-option__icon-wrap {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: var(--panel-radius-sm);
  color: var(--gk-color-on-surface-muted);
  background: color-mix(in srgb, var(--gk-color-on-surface) 6%, transparent);
  transition:
    color 0.18s ease,
    background 0.18s ease,
    box-shadow 0.18s ease;
}

.base-option:hover .base-option__icon-wrap {
  color: var(--gk-color-on-surface);
  background: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
}

.base-option--selected .base-option__icon-wrap {
  color: var(--gk-color-primary);
  background: color-mix(in srgb, var(--gk-color-primary) 14%, transparent);
  box-shadow: inset 0 0 0 1px color-mix(in srgb, var(--gk-color-primary) 22%, transparent);
}

.base-option__icon {
  opacity: 1;
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
