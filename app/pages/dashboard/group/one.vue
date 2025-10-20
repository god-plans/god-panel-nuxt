<template>
  <BlankView :title="$t('pages.groups.five')" />
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

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
