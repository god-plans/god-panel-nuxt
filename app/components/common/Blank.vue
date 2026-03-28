<template>
  <div class="w-full">
    <h2 class="panel-section-title mb-5">{{ title }}</h2>

    <div
      class="blank-placeholder w-full panel-card border-dashed"
      style="margin-top: 20px; height: 320px"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Blank'
})
</script>

<style scoped>
.blank-placeholder {
  border-style: dashed;
  background: color-mix(in srgb, var(--gk-color-border) 8%, var(--gk-color-surface));
  box-shadow: none;
}
</style>
