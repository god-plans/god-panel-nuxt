<template>
  <div class="font-options">
    <div class="font-options__header">
      <span class="font-options__title">{{ t('settingsDrawer.font') }}</span>
    </div>

    <div class="font-options__grid">
      <button
        v-for="font in options"
        :key="font"
        type="button"
        class="font-option"
        :class="{ 'font-option--selected': value === font }"
        :style="{ fontFamily: getFontFamily(font) }"
        @click="handleClick(font)"
      >
        <AppIcon
          class="font-option__icon"
          :class="{ 'font-option__icon--active': value === font }"
          name="format-font"
          :size="28"
        />
        <span class="font-option__name">{{ font }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()
interface Props {
  value: string
  options: string[]
}

defineProps<Props>()

const emit = defineEmits<{
  'click-option': [value: string]
}>()

const handleClick = (font: string) => {
  emit('click-option', font)
}

const getFontFamily = (font: string) => {
  const fontMap: Record<string, string> = {
    'Inter': 'Inter, sans-serif',
    'Roboto': 'Roboto, sans-serif',
    'Poppins': 'Poppins, sans-serif',
    'Barlow': 'Barlow, sans-serif',
    'DM Sans': 'DM Sans, sans-serif',
    'Nunito Sans': 'Nunito Sans, sans-serif'
  }
  return fontMap[font] || font
}
</script>

<style scoped>
.font-options {
  padding: 32px 16px 16px 16px;
  border: 1px solid color-mix(in srgb, var(--gk-color-on-surface) 12%, transparent);
  border-radius: 16px;
  position: relative;
}

.font-options__header {
  position: absolute;
  top: -12px;
  left: 16px;
}

.font-options__title {
  font-size: 13px;
  font-weight: 600;
  line-height: 22px;
  color: var(--gk-color-bg);
  background: var(--gk-color-on-surface);
  padding: 0 10px;
  border-radius: 22px;
  display: inline-flex;
  align-items: center;
}

.font-options__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.font-option {
  padding: 16px;
  border-radius: 12px;
  border: 1px solid transparent;
  background: transparent;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  font-weight: 500;
  font-size: 12px;
  color: color-mix(in srgb, var(--gk-color-on-surface) 60%, transparent);
}

.font-option:hover {
  border-color: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
}

.font-option--selected {
  color: var(--gk-color-on-surface);
  border-color: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
  box-shadow: -8px 8px 20px -4px color-mix(in srgb, var(--gk-color-on-surface) 12%, transparent);
}

.font-option__icon {
  opacity: 0.6;
}

.font-option__icon--active {
  opacity: 1;
  color: var(--gk-color-primary);
}

.font-option__name {
  text-align: center;
  line-height: 14px;
}
</style>
