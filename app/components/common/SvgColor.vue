<template>
  <img
    :src="src"
    :alt="alt"
    :class="['svg-color', $attrs.class]"
    :style="computedStyle"
  />
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  src: string
  size?: number | string
  color?: string
  alt?: string
}

const props = withDefaults(defineProps<Props>(), {
  size: 24,
  color: 'currentColor',
  alt: ''
})

const computedStyle = computed(() => ({
  width: typeof props.size === 'number' ? `${props.size}px` : props.size,
  height: typeof props.size === 'number' ? `${props.size}px` : props.size,
  flexShrink: 0,
  display: 'inline-block',
  filter: props.color !== 'currentColor' ? `brightness(0) saturate(100%) invert(${getInvertValue(props.color)})` : undefined
}))

// Helper function to convert color to invert filter value
function getInvertValue(color: string): number {
  // This is a simplified approach - in a real implementation you might want to parse the color properly
  if (color.includes('rgb') || color.includes('#')) {
    return 0 // Assume dark colors need no inversion
  }
  return 0
}
</script>

<style scoped>
.svg-color {
  /* Ensure SVG displays properly */
  object-fit: contain;
}
</style>
