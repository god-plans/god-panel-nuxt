<template>
  <v-main
    class="dashboard-main"
    :style="mainStyles"
  >
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

const mainStyles = computed(() => ({
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
