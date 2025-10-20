<template>
  <BlankView :title="$t('pages.groups.six')" />
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
  title: 'Group Six - God Panel'
})
</script>
