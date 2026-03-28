<template>
  <span
    class="app-icon mdi"
    :class="iconClass"
    :style="iconStyle"
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

const iconStyle = computed(() => {
  if (props.size) {
    return {
      fontSize: `${props.size}px`,
      width: `${props.size}px`,
      height: `${props.size}px`,
      lineHeight: 1,
    } as const
  }
  return { lineHeight: 1 } as const
})
</script>

<style scoped>
/* MDI webfont: normalize line box so icons align with adjacent text in flex rows */
.app-icon.mdi {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  line-height: 1;
  vertical-align: middle;
}

.app-icon.mdi::before {
  line-height: 1;
}
</style>
