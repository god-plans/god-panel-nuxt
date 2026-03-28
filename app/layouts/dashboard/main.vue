<template>
  <main
    class="dashboard-main"
    :style="mainStyles"
  >
    <slot />
  </main>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue'

interface Props {
  isNavHorizontal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  isNavHorizontal: false
})

const mainStyles = computed((): CSSProperties => ({
  display: 'flex',
  flex: '1 1 auto',
  flexDirection: 'column',
  ...(props.isNavHorizontal && {
    '--layout-dashboard-content-pt': '40px'
  })
}))
</script>

<style scoped>
.dashboard-main {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
}
</style>
