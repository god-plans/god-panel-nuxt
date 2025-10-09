<template>
  <BlankView title="Analytics" />
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
useHead({
  title: 'Analytics - God Panel'
})
</script>
