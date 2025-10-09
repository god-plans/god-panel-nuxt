<template>
  <BlankView title="Orders" />
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
useHead({
  title: 'Orders - God Panel'
})
</script>
