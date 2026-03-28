<template>
  <span
    class="app-icon mdi"
    :class="iconClass"
    :style="
      size
        ? { fontSize: `${size}px`, width: `${size}px`, height: `${size}px` }
        : undefined
    "
    aria-hidden="true"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  /** MDI icon class segment, e.g. `bell` or `mdi-bell` */
  name: string
  size?: number
}>()

const iconClass = computed(() =>
  props.name.startsWith('mdi-') ? props.name : `mdi-${props.name}`
)
</script>
