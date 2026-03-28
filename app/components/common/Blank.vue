<template>
  <div class="w-full">
    <h2 class="text-xl font-semibold mb-5">{{ title }}</h2>

    <div
      class="w-full rounded-lg border border-dashed border-[var(--gk-color-border)] bg-[color-mix(in_srgb,var(--gk-color-border)_4%,transparent)]"
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
