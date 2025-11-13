<template>
  <div class="register-placeholder">
    <h1>{{ t('auth.signUp') }}</h1>
    <p>This is a placeholder page. Registration feature coming soon.</p>
    <NuxtLink to="/auth/login" class="back-link">
      {{ t('auth.signInHere') }}
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
  title: t('auth.createAccount') + ' - God Panel'
})
</script>

<style scoped>
.register-placeholder {
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
