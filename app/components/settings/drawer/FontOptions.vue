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
        <v-icon
          class="font-option__icon"
          :class="{ 'font-option__icon--active': value === font }"
        >
          mdi-format-font
        </v-icon>
        <span class="font-option__name">{{ font }}</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
interface Props {
  value: string
  options: string[]
}

const props = defineProps<Props>()

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
  border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
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
  color: rgb(var(--v-theme-background));
  background: rgb(var(--v-theme-on-surface));
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
  color: rgba(var(--v-theme-on-surface), 0.6);
}

.font-option:hover {
  border-color: rgba(var(--v-theme-on-surface), 0.08);
}

.font-option--selected {
  color: rgb(var(--v-theme-on-surface));
  border-color: rgba(var(--v-theme-on-surface), 0.08);
  box-shadow: -8px 8px 20px -4px rgba(var(--v-theme-on-surface), 0.12);
}

.font-option__icon {
  width: 28px;
  height: 28px;
  opacity: 0.6;
}

.font-option__icon--active {
  opacity: 1;
  color: rgb(var(--v-theme-primary));
}

.font-option__name {
  text-align: center;
  line-height: 14px;
}
</style>
