<template>
  <v-main class="flex flex-col flex-1">
    <slot />
  </v-main>
</template>

<script setup lang="ts">
interface Props {
  isNavHorizontal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isNavHorizontal: false
})
</script>
