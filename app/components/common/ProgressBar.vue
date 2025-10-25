<template>
  <div
    v-if="isLoading"
    class="fixed top-0 left-0 right-0 h-0.5 z-[9999] bg-white dark:bg-gray-900"
  >
    <div
      class="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300 ease-out shadow-lg"
      :style="{ width: `${progress}%` }"
    />
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




