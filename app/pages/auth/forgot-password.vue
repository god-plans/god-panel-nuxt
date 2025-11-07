<template>
  <div class="forgot-password-placeholder">
    <h1>{{ t('auth.resetPassword') }}</h1>
    <p>This is a placeholder page. Password reset feature coming soon.</p>
    <NuxtLink to="/auth/login" class="back-link">
      {{ t('auth.backToSignIn') }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Page meta
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

// SEO
useHead({
  title: t('auth.resetPassword') + ' - God Panel'
})
</script>

<style scoped>
.forgot-password-placeholder {
  text-align: center;
  padding: 2rem;
}

.back-link {
  display: inline-block;
  margin-top: 1rem;
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}
</style>
