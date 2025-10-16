<template>
  <div class="loading-screen">
    <div class="loading-screen__content">
      <!-- Logo -->
      <div class="loading-screen__logo">
        <v-img
          src="/logo-single.png"
          width="64"
          height="64"
          class="loading-screen__logo-image"
        />
      </div>

      <!-- Loading Animation -->
      <div class="loading-screen__animation">
        <div class="loading-spinner">
          <div class="loading-spinner__dot" v-for="i in 3" :key="i" :style="{ animationDelay: `${i * 0.2}s` }"></div>
        </div>
      </div>

      <!-- Loading Text -->
      <div class="loading-screen__text">
        <h3 class="loading-screen__title">{{ title }}</h3>
        <p class="loading-screen__subtitle">{{ subtitle }}</p>
      </div>

      <!-- Progress Bar -->
      <div v-if="showProgress" class="loading-screen__progress">
        <v-progress-linear
          :model-value="progress"
          color="primary"
          height="4"
          rounded
          class="loading-screen__progress-bar"
        />
        <span class="loading-screen__progress-text">{{ progress }}%</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  showProgress?: boolean
  progress?: number
}

const props = withDefaults(defineProps<Props>(), {
  title: 'Loading...',
  subtitle: 'Please wait while we prepare your dashboard',
  showProgress: false,
  progress: 0
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgb(var(--v-theme-background));
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.loading-screen__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  max-width: 400px;
  padding: 24px;
}

.loading-screen__logo {
  animation: logo-bounce 2s ease-in-out infinite;
}

.loading-screen__logo-image {
  filter: drop-shadow(0 4px 8px rgba(var(--v-theme-primary), 0.3));
}

@keyframes logo-bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.loading-spinner {
  display: flex;
  gap: 8px;
}

.loading-spinner__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgb(var(--v-theme-primary));
  animation: loading-bounce 1.4s ease-in-out infinite both;
}

.loading-spinner__dot:nth-child(1) {
  animation-delay: -0.32s;
}

.loading-spinner__dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes loading-bounce {
  0%, 80%, 100% {
    transform: scale(0);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}

.loading-screen__text {
  text-align: center;
}

.loading-screen__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-background));
  margin-bottom: 8px;
}

.loading-screen__subtitle {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
}

.loading-screen__progress {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.loading-screen__progress-bar {
  width: 200px;
}

.loading-screen__progress-text {
  font-size: 0.75rem;
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface-variant));
}

/* Responsive */
@media (max-width: 600px) {
  .loading-screen__content {
    gap: 24px;
    padding: 16px;
  }

  .loading-screen__title {
    font-size: 1.25rem;
  }

  .loading-screen__progress-bar {
    width: 150px;
  }
}
</style>

