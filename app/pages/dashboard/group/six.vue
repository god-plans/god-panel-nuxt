<template>
  <BlankView title="Group Six" />
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
useHead({
  title: 'Group Six - God Panel'
})
</script>
