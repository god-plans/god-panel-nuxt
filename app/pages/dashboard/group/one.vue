<template>
  <div class="max-w-4xl mx-auto my-4 rounded-lg border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-6">
    <div class="grid grid-cols-1 gap-4">
      <h1 class="text-xl font-semibold">Group One</h1>
      <p class="opacity-80">Dashboard group page placeholder.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})
</script>
