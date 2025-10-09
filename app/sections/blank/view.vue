<template>
  <DashboardContent max-width="xl">
    <h4 class="text-h4 mb-4">
      {{ title }}
    </h4>

    <v-sheet
      class="blank-placeholder mt-5"
      :height="320"
      :style="{
        border: `dashed 1px rgb(var(--v-theme-surface-variant))`,
        backgroundColor: `rgb(var(--v-theme-surface))`
      }"
    />
  </DashboardContent>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Blank'
})
</script>

<style scoped>
.blank-placeholder {
  width: 100%;
  border-radius: 8px;
}
</style>
