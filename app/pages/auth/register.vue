<template>
  <div class="auth-placeholder">
    <h1 class="auth-placeholder__title">{{ t('auth.createAccount') }}</h1>
    <p class="auth-placeholder__text">{{ t('auth.registerComingSoon') }}</p>
    <NuxtLink to="/auth/login" class="auth-placeholder__link">
      {{ t('auth.backToSignIn') }}
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'Create account — God Panel' })
</script>

<style scoped>
.auth-placeholder {
  text-align: center;
}

.auth-placeholder__title {
  margin: 0 0 0.75rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
}

.auth-placeholder__text {
  margin: 0;
  color: var(--gk-color-on-surface-muted);
}

.auth-placeholder__link {
  display: inline-block;
  margin-top: 1.5rem;
  color: var(--gk-color-primary);
  font-weight: 500;
  text-decoration: none;
}

.auth-placeholder__link:hover {
  text-decoration: underline;
}
</style>
