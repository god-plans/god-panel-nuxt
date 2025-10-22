<template>
  <div class="auth-section ">
    <div class="section-content">
      <h3 class="section-title">{{ title }}</h3>

      <p v-if="subtitle" class="section-subtitle">
        {{ subtitle }}
      </p>
    </div>

    <div class="section-image">
      <v-img
        :src="imgUrl"
        alt="Auth illustration"
        aspect-ratio="4/3"
        cover
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
.auth-section {
  background-color: rgb(var(--v-theme-background-default, #ffffff));
  background-size: cover;
  background-position: center;
  padding: 16px;
  width: 100%;
  max-width: 480px;
  position: relative;
  display: none;
  border-radius: 8px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;
  padding-top: var(--layout-header-desktop-height);
  min-height: 100vh;
}

.section-content {
  text-align: center;
}

.section-title {
  font-size: 28px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 16px;
}

.section-subtitle {
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 16px;
  margin-top: 8px;
}

.section-image {
  width: 100%;
}

/* Responsive adjustments */
@media (min-width: 960px) {
  .auth-section {
    display: flex;
  }
}
</style>
