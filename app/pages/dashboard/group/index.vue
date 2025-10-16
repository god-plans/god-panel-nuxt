<template>
  <BlankView title="Group Management" />
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
useHead({
  title: 'Group Management - God Panel'
})
</script>
