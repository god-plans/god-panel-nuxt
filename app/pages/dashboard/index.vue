<template>
  <BlankView title="Page one" />
</template>

<script setup lang="ts">
import BlankView from '~/sections/blank/view.vue'

// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
useHead({
  title: 'Dashboard - God Panel'
})
</script>
