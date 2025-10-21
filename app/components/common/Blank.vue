<template>
  <DashboardContent max-width="xl">
    <v-typography variant="h4" class="mb-5">
      {{ title }}
    </v-typography>

    <v-sheet
      :style="{
        marginTop: '20px',
        width: '100%',
        height: '320px',
        borderRadius: '8px',
        backgroundColor: `rgba(var(--v-theme-surface-variant), 0.04)`,
        border: `dashed 1px rgb(var(--v-border-color))`
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
