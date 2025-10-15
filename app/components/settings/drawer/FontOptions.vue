<template>
  <div class="font-options">
    <div class="font-options__header">
      <span class="font-options__title">Font</span>
    </div>

    <div class="font-options__grid">
      <v-btn
        v-for="font in options"
        :key="font"
        variant="outlined"
        class="font-option"
        :class="{ 'font-option--selected': value === font }"
        :style="{ fontFamily: getFontFamily(font) }"
        @click="handleClick(font)"
      >
        <div class="font-option__content">
          <v-icon class="font-option__icon" :class="{ 'font-option__icon--active': value === font }">
            mdi-format-font
          </v-icon>
          <div class="font-option__name">{{ font }}</div>
        </div>
      </v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
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
  padding: 16px 0 16px 16px;
  border: 1px solid rgb(var(--v-theme-surface-variant));
  border-radius: 12px;
  position: relative;
}

.font-options__header {
  position: absolute;
  top: -12px;
  left: 16px;
  background: rgb(var(--v-theme-surface));
  padding: 0 8px;
}

.font-options__title {
  font-size: 13px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  background: rgb(var(--v-theme-surface));
  padding: 4px 8px;
  border-radius: 11px;
  border: 1px solid rgb(var(--v-theme-surface-variant));
}

.font-options__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 8px;
}

.font-option {
  height: 64px;
  padding: 12px;
  border-radius: 8px;
  border: 2px solid rgb(var(--v-theme-surface-variant));
  background: rgb(var(--v-theme-surface));
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.font-option:hover {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.font-option--selected {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary-rgb), 0.3);
}

.font-option__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.font-option__icon {
  width: 28px;
  height: 28px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.font-option__icon--active {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary-light)), rgb(var(--v-theme-primary)));
  color: rgb(var(--v-theme-on-primary));
}

.font-option__name {
  font-size: 12px;
  font-weight: 500;
  text-align: center;
  line-height: 14px;
}
</style>
