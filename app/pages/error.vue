<template>
  <div class="error-page panel-page">
    <PageErrorBoundary
      :error="error"
      :loading="false"
      title="Oops! Something went wrong"
      show-details
      show-report
      show-retry
      show-home
    />
  </div>
</template>

<script setup lang="ts">
import PageErrorBoundary from '~/components/common/PageErrorBoundary.vue'

defineProps<{
  error: any
}>()

// Handle error reporting
const handleErrorReport = () => {
  // Additional error reporting logic can be added here
  console.log('Error reported from error page')
}

// Page meta
useHead({
  title: 'Error - God Panel',
  meta: [
    {
      name: 'robots',
      content: 'noindex, nofollow'
    }
  ]
})
</script>

<style scoped lang="scss">
.error-page {
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
</style>

