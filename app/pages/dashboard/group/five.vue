<template>
  <BlankView title="Group Five" />
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
useHead({
  title: 'Group Five - God Panel'
})
</script>
