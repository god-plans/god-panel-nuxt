<template>
  <div class="presets-options panel-card">
    <div class="presets-options__header">
      <span class="presets-options__title">{{ t('settingsDrawer.presets') }}</span>
    </div>

    <div class="presets-options__grid">
        <button
        v-for="option in options"
        :key="option.key || option.name"
        type="button"
        class="preset-option"
        :class="{ 'preset-option--selected': value === (option.key || option.name) }"
        :style="{ color: option.value, ...(value === (option.key || option.name) && { backgroundColor: `${option.value}14` }) }"
        @click="handleClick(option.key || option.name)"
      >
        <AppIcon class="preset-option__icon" name="view-dashboard-outline" :size="28" />
        <span class="preset-option__label">{{ option.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()

interface PresetOption {
  name: string
  value: string
  key?: string
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
  position: relative;
}

.presets-options__header {
  position: absolute;
  top: -12px;
  left: 16px;
}

.presets-options__title {
  font-size: 0.6875rem;
  font-weight: 600;
  line-height: 1.2;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--gk-color-on-surface-muted);
  background: color-mix(in srgb, var(--gk-color-primary) 8%, var(--gk-color-surface));
  padding: 0.35rem 0.65rem;
  border-radius: 999px;
  border: 1px solid var(--panel-hairline);
  display: inline-flex;
  align-items: center;
}

.presets-options__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.preset-option {
  height: 80px;
  padding: 8px;
  border-radius: 12px;
  border: none;
  background: transparent;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  gap: 4px;
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

.preset-option__label {
  font-size: 0.75rem;
  font-weight: 500;
  margin-top: 4px;
  color: var(--gk-color-on-surface);
  opacity: 0.8;
}

.preset-option--selected .preset-option__label {
  opacity: 1;
  font-weight: 600;
}
</style>
