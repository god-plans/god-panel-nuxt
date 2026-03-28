<template>
  <div class="auth-section">
    <div class="section-content">
      <h3 class="section-title">{{ title }}</h3>

      <p v-if="subtitle" class="section-subtitle">
        {{ subtitle }}
      </p>
    </div>

    <div class="section-image">
      <img
        :src="imgUrl"
        alt="Auth illustration"
        class="section-image-img w-full  object-cover"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  imgUrl?: string
  layoutQuery?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Manage the job',
  subtitle: 'More effectively with optimized workflows.',
  imgUrl: '/assets/illustrations/illustration-dashboard.webp',
  layoutQuery: 'md'
})
</script>

<style scoped>
/* Hero column: no card chrome — sits on .panel-page like the form column */
.auth-section {
  background: transparent;
  padding: 0 1rem;
  width: 100%;
  max-width: 480px;
  position: relative;
  display: none;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1.75rem;
  min-height: 0;
  flex: 1 1 auto;
}

.section-content {
  text-align: center;
}

.section-title {
  font-size: 1.65rem;
  font-weight: 600;
  letter-spacing: -0.02em;
  line-height: 1.25;
  color: var(--gk-color-on-surface);
  margin-bottom: 0.75rem;
}

.section-subtitle {
  color: var(--gk-color-on-surface-muted);
  font-size: 1rem;
  line-height: 1.5;
  margin-top: 0;
}

.section-image {
  width: 100%;
}

.section-image-img {
  border-radius: var(--panel-radius-md);
}

@media (min-width: 960px) {
  .auth-section {
    display: flex;
    min-height: min(640px, calc(100dvh - var(--layout-header-desktop-height, 64px) - 4rem));
  }
}
</style>
