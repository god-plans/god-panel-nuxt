<template>
  <v-btn
    variant="outlined"
    class="color-option"
    :class="{ 'color-option--selected': selected }"
    @click="handleClick"
  >
    <div class="color-option__content">
      <v-icon class="color-option__icon" :class="{ 'color-option__icon--active': selected }">
        {{ option === 'integrate' ? 'mdi-view-dashboard-outline' : 'mdi-view-dashboard' }}
      </v-icon>

      <div class="color-option__label">
        {{ option.charAt(0).toUpperCase() + option.slice(1) }}
      </div>
    </div>
  </v-btn>
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
  min-height: 56px;
  padding: 12px;
  border-radius: 8px;
  border: 1px solid rgb(var(--v-theme-surface-variant));
  background: rgb(var(--v-theme-surface));
  color: rgb(var(--v-theme-on-surface-variant));
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.color-option:hover {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary-rgb), 0.04);
}

.color-option--selected {
  border-width: 2px;
  border-color: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-surface));
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary-rgb), 0.3);
}

.color-option__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.color-option__icon {
  width: 24px;
  height: 24px;
  transition: all 0.2s ease;
}

.color-option__icon--active {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary-light)), rgb(var(--v-theme-primary)));
  border-radius: 4px;
  color: rgb(var(--v-theme-on-primary));
}

.color-option__label {
  font-size: 12px;
  font-weight: 600;
  text-transform: capitalize;
  line-height: 14px;
}
</style>
