<template>
  <div class="font-options panel-card">
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
  position: relative;
}

.font-options__header {
  position: absolute;
  top: -12px;
  left: 16px;
}

.font-options__title {
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
  border-color: color-mix(in srgb, var(--gk-color-primary) 28%, var(--gk-color-border));
  background: color-mix(in srgb, var(--gk-color-primary) 9%, transparent);
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--gk-color-primary) 18%, transparent),
    var(--panel-shadow-card);
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
