<template>
  <button
    type="button"
    class="layout-option"
    :class="[
      `layout-option--${option}`,
      { 'layout-option--selected': selected }
    ]"
    @click="handleClick"
  >
    <div class="layout-option__nav">
      <div class="layout-option__circle" />
      <div class="layout-option__primary-item" />
      <div class="layout-option__secondary-item" />
    </div>
    <div class="layout-option__content" />
  </button>
</template>

<script setup lang="ts">
interface Props {
  option: 'vertical' | 'horizontal' | 'mini'
  selected?: boolean
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
</script>

<style scoped>
.layout-option {
  flex: 1;
  height: 64px;
  padding: 0;
  border-radius: var(--item-radius);
  border: 1px solid var(--item-border-color);
  background: transparent;
  transition: all 0.2s ease;
  display: flex;
  cursor: pointer;
  overflow: hidden;
}

.layout-option:hover {
  background: color-mix(in srgb, var(--gk-color-on-surface) 4%, transparent);
}

.layout-option--selected {
  box-shadow: -8px 8px 20px -4px color-mix(in srgb, var(--gk-color-on-surface) 12%, transparent);
}

.layout-option__nav {
  flex-shrink: 0;
  padding: 6px;
  width: 32px;
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-right: 1px solid var(--item-border-color);
}

.layout-option--mini .layout-option__nav {
  width: 22px;
}

.layout-option--horizontal {
  flex-direction: column;
}

.layout-option--horizontal .layout-option__nav {
  width: 100%;
  height: 22px;
  flex-direction: row;
  align-items: center;
  border-right: none;
  border-bottom: 1px solid var(--item-border-color);
}

.layout-option__circle {
  flex-shrink: 0;
  width: 10px;
  height: 10px;
  border-radius: 8px;
  background: var(--item-bg);
  opacity: 0.8;
  transition: all 0.2s ease;
}

.layout-option--selected .layout-option__circle {
  opacity: 1;
  background: linear-gradient(135deg, var(--gk-color-primary) 0%, var(--gk-color-primary) 100%);
}

.layout-option__primary-item {
  flex-shrink: 0;
  width: 100%;
  height: 4px;
  border-radius: 8px;
  background: var(--item-bg);
  opacity: 0.48;
  transition: all 0.2s ease;
}

.layout-option--horizontal .layout-option__primary-item {
  width: 16px;
  height: 4px;
}

.layout-option--selected .layout-option__primary-item {
  background: linear-gradient(135deg, var(--gk-color-primary) 0%, var(--gk-color-primary) 100%);
}

.layout-option__secondary-item {
  flex-shrink: 0;
  width: 100%;
  max-width: 14px;
  height: 4px;
  border-radius: 8px;
  background: var(--item-bg);
  opacity: 0.24;
  transition: all 0.2s ease;
}

.layout-option--horizontal .layout-option__secondary-item {
  max-width: 10px;
}

.layout-option--selected .layout-option__secondary-item {
  background: linear-gradient(135deg, var(--gk-color-primary) 0%, var(--gk-color-primary) 100%);
}

.layout-option__content {
  flex: 1;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.layout-option__content::before {
  content: '';
  width: 100%;
  height: 100%;
  border-radius: 6px;
  background: var(--item-bg);
  opacity: 0.2;
  transition: all 0.2s ease;
}

.layout-option--selected .layout-option__content::before {
  background: linear-gradient(135deg, var(--gk-color-primary) 0%, var(--gk-color-primary) 100%);
}
</style>
