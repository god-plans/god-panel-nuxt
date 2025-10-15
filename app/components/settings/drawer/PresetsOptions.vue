<template>
  <div class="presets-options">
    <div class="presets-options__header">
      <span class="presets-options__title">Presets</span>
    </div>

    <div class="presets-options__grid">
      <v-btn
        v-for="option in options"
        :key="option.name"
        variant="outlined"
        class="preset-option"
        :class="{ 'preset-option--selected': value === option.name }"
        @click="handleClick(option.name)"
      >
        <div
          class="preset-option__preview"
          :style="{ background: `linear-gradient(135deg, ${option.value} 0%, ${option.value} 100%)` }"
        >
          <v-icon class="preset-option__icon">mdi-view-dashboard</v-icon>
        </div>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import primaryColors from '~/theme/with-settings/primary-color.json'

interface PresetOption {
  name: string
  value: string
}

interface Props {
  value: string
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'click-option': [value: string]
}>()

const options = computed<PresetOption[]>(() => [
  { name: 'default', value: 'rgb(var(--v-theme-primary))' },
  { name: 'cyan', value: primaryColors.cyan.main },
  { name: 'purple', value: primaryColors.purple.main },
  { name: 'blue', value: primaryColors.blue.main },
  { name: 'orange', value: primaryColors.orange.main },
  { name: 'red', value: primaryColors.red.main }
])

const handleClick = (value: string) => {
  emit('click-option', value)
}
</script>

<style scoped>
.presets-options {
  padding: 16px 0 16px 16px;
  border: 1px solid rgb(var(--v-theme-surface-variant));
  border-radius: 12px;
  position: relative;
}

.presets-options__header {
  position: absolute;
  top: -12px;
  left: 16px;
  background: rgb(var(--v-theme-surface));
  padding: 0 8px;
}

.presets-options__title {
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
  padding: 4px 8px;
  border-radius: 11px;
  border: 1px solid rgb(var(--v-theme-surface-variant));
}

.presets-options__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 8px;
}

.preset-option {
  height: 64px;
  padding: 0;
  border-radius: 8px;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  overflow: hidden;
}

.preset-option:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.preset-option--selected {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary-rgb), 0.3);
}

.preset-option__preview {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.preset-option__preview::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
}

.preset-option__icon {
  color: white;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
  z-index: 1;
}
</style>
