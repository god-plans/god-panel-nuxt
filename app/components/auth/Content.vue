<template>
  <div class="flex flex-col items-center justify-center flex-1 px-4 py-4 md:px-6 md:py-0 md:pt-6 bg-gray-50 dark:bg-gray-900">
    <div class="w-full max-w-[420px] flex flex-col">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  layoutQuery?: string
}

withDefaults(defineProps<Props>(), {
  layoutQuery: 'md'
})
</script>
