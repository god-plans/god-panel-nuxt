<template>
  <main class="flex flex-col flex-1 md:flex-row">
    <slot />
  </main>
</template>

<script setup lang="ts">
interface Props {
  layoutQuery?: string
}

withDefaults(defineProps<Props>(), {
  layoutQuery: 'md'
})
</script>
