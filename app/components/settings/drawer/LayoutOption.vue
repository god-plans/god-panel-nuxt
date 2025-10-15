<template>
  <v-btn
    variant="outlined"
    class="layout-option"
    :class="{ 'layout-option--selected': selected }"
    @click="handleClick"
  >
    <div class="layout-option__nav">
      <!-- Navigation indicator -->
      <div class="nav-indicator">
        <div class="nav-indicator__circle" :class="{ 'nav-indicator--active': selected }"></div>
        <div class="nav-indicator__bar nav-indicator__bar--primary" :class="{ 'nav-indicator--active': selected }"></div>
        <div class="nav-indicator__bar nav-indicator__bar--secondary" :class="{ 'nav-indicator--active': selected }"></div>
      </div>

      <!-- Content area -->
      <div class="layout-option__content">
        <div class="content-area" :class="{ 'content-area--active': selected }"></div>
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
.layout-option {
  width: 64px;
  height: 64px;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid rgb(var(--v-theme-surface-variant));
  background: rgb(var(--v-theme-surface));
  transition: all 0.2s ease;
  overflow: hidden;
}

.layout-option:hover {
  border-color: rgb(var(--v-theme-primary));
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.layout-option--selected {
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary-rgb), 0.3);
}

.layout-option__nav {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  overflow: hidden;
}

.nav-indicator {
  display: flex;
  align-items: center;
  padding: 6px;
  border-right: 1px solid rgb(var(--v-theme-surface-variant));
  background: rgb(var(--v-theme-surface-variant));
  gap: 4px;
}

.nav-indicator__circle {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(var(--v-theme-on-surface-variant));
  opacity: 0.8;
  transition: all 0.2s ease;
}

.nav-indicator--active {
  background: rgb(var(--v-theme-primary)) !important;
  opacity: 1 !important;
}

.nav-indicator__bar {
  width: 2px;
  border-radius: 1px;
  background: rgb(var(--v-theme-on-surface-variant));
  transition: all 0.2s ease;
}

.nav-indicator__bar--primary {
  height: 12px;
  opacity: 0.48;
}

.nav-indicator__bar--secondary {
  height: 8px;
  opacity: 0.24;
}

/* Mini layout adjustments */
.layout-option[data-option="mini"] .nav-indicator {
  width: 16px;
}

/* Horizontal layout adjustments */
.layout-option[data-option="horizontal"] .layout-option__nav {
  flex-direction: row;
}

.layout-option[data-option="horizontal"] .nav-indicator {
  border-right: none;
  border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
  width: 100%;
  height: 16px;
  flex-direction: row;
  padding: 4px 6px;
}

.layout-option[data-option="horizontal"] .nav-indicator__bar {
  width: 8px;
  height: 2px;
}

.layout-option[data-option="horizontal"] .nav-indicator__bar--primary {
  width: 12px;
}

.layout-option[data-option="horizontal"] .nav-indicator__bar--secondary {
  width: 8px;
}

.layout-option__content {
  flex: 1;
  padding: 4px;
}

.content-area {
  width: 100%;
  height: 100%;
  border-radius: 2px;
  background: rgb(var(--v-theme-surface-variant));
  opacity: 0.2;
  transition: all 0.2s ease;
}

.content-area--active {
  background: rgb(var(--v-theme-primary));
  opacity: 0.3;
}
</style>
