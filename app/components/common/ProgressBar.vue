<template>
  <div
    v-if="isLoading"
    class="progress-bar"
    :style="{ '--progress-width': `${progress}%` }"
  >
    <div class="progress-bar__fill" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  isLoading?: boolean
  progress?: number
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  progress: 0
})
</script>

<style scoped>
.progress-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  z-index: 9999;
  background-color: rgb(var(--v-theme-surface));
}

.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, rgb(var(--v-theme-primary)) 0%, rgb(var(--v-theme-secondary)) 100%);
  width: var(--progress-width);
  transition: width 0.3s ease;
  box-shadow: 0 0 10px rgba(var(--v-theme-primary), 0.5);
}
</style>

