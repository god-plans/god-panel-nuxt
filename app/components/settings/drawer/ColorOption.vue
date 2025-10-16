<template>
  <button
    type="button"
    class="color-option"
    :class="{ 'color-option--selected': selected }"
    @click="handleClick"
  >
    <v-icon class="color-option__icon">
      {{ option === 'integrate' ? 'mdi-view-sidebar-outline' : 'mdi-view-sidebar' }}
    </v-icon>
    <span class="color-option__label">
      {{ option.charAt(0).toUpperCase() + option.slice(1) }}
    </span>
  </button>
</template>

<script setup lang="ts">
interface Props {
  option: string
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
.color-option {
  flex: 1;
  min-height: 56px;
  padding: 12px;
  border-radius: var(--item-radius);
  border: none;
  background: transparent;
  color: rgba(var(--v-theme-on-surface), 0.6);
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
}

.color-option:hover {
  background: rgba(var(--v-theme-on-surface), 0.04);
}

.color-option--selected {
  border: 1px solid var(--item-border-color);
  color: rgb(var(--v-theme-on-surface));
  box-shadow: -8px 8px 20px -4px rgba(var(--v-theme-on-surface), 0.12);
}

.color-option__icon {
  width: 24px;
  height: 24px;
  opacity: 0.7;
}

.color-option--selected .color-option__icon {
  opacity: 1;
  filter: brightness(0) saturate(100%);
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-primary)) 100%);
  -webkit-mask-image: var(--icon-mask);
  mask-image: var(--icon-mask);
  -webkit-mask-size: contain;
  mask-size: contain;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
}

.color-option__label {
  font-size: 13px;
  font-weight: 600;
  line-height: 18px;
  text-transform: capitalize;
}
</style>
