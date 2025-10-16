<template>
  <div class="presets-options">
    <div class="presets-options__header">
      <span class="presets-options__title">Presets</span>
    </div>

    <div class="presets-options__grid">
      <button
        v-for="option in options"
        :key="option.name"
        type="button"
        class="preset-option"
        :class="{ 'preset-option--selected': value === option.name }"
        :style="{ color: option.value, ...(value === option.name && { backgroundColor: `${option.value}14` }) }"
        @click="handleClick(option.name)"
      >
        <img
          src="/assets/icons/setting/ic-siderbar-duotone.svg"
          alt="preset"
          class="preset-option__icon"
        >
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface PresetOption {
  name: string
  value: string
}

interface Props {
  value: string
  options?: PresetOption[]
}

const props = withDefaults(defineProps<Props>(), {
  options: () => []
})

const emit = defineEmits<{
  'click-option': [value: string]
}>()

const handleClick = (value: string) => {
  emit('click-option', value)
}
</script>

<style scoped>
.presets-options {
  padding: 32px 16px 16px 16px;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  border-radius: 16px;
  position: relative;
}

.presets-options__header {
  position: absolute;
  top: -12px;
  left: 16px;
}

.presets-options__title {
  font-size: 13px;
  font-weight: 600;
  line-height: 22px;
  color: rgb(var(--v-theme-background));
  background: rgb(var(--v-theme-on-surface));
  padding: 0 10px;
  border-radius: 22px;
  display: inline-flex;
  align-items: center;
}

.presets-options__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.preset-option {
  height: 64px;
  padding: 0;
  border-radius: 12px;
  border: none;
  background: transparent;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.preset-option:hover {
  transform: translateY(-2px);
}

.preset-option--selected {
  background: currentColor;
  opacity: 0.08;
}

.preset-option__icon {
  width: 28px;
  height: 28px;
}
</style>
