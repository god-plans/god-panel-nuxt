<template>
  <div class="search-not-found">
    <div class="search-not-found__content">
      <div class="search-not-found__illustration">
        <AppIcon
          :name="iconName"
          :size="120"
          class="search-not-found__icon opacity-60 text-[var(--gk-color-on-surface-muted)]"
        />
      </div>

      <div class="search-not-found__text">
        <h2 class="search-not-found__title">{{ title }}</h2>
        <p class="search-not-found__description">{{ description }}</p>
      </div>

      <div v-if="showAction" class="search-not-found__actions">
        <GkButton
          v-if="actionText && actionHandler"
          variant="primary"
          @click="actionHandler"
        >
          {{ actionText }}
        </GkButton>

        <GkButton
          v-if="secondaryActionText && secondaryActionHandler"
          variant="secondary"
          @click="secondaryActionHandler"
        >
          {{ secondaryActionText }}
        </GkButton>
      </div>

      <div v-if="$slots.additional" class="search-not-found__additional">
        <slot name="additional" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GkButton } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'

interface Props {
  title?: string
  description?: string
  icon?: string
  iconColor?: string
  showAction?: boolean
  actionText?: string
  actionHandler?: () => void
  secondaryActionText?: string
  secondaryActionHandler?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'No results found',
  description: 'Try adjusting your search or filter criteria.',
  icon: 'mdi-magnify',
  showAction: true,
  actionText: 'Clear filters',
  secondaryActionText: 'Go back',
})

const iconName = computed(() => props.icon.replace(/^mdi-/, ''))
</script>

<style scoped>
.search-not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 24px;
}

.search-not-found__content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  max-width: 480px;
  text-align: center;
}

.search-not-found__illustration {
  animation: float 3s ease-in-out infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

.search-not-found__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
  margin: 0;
}

.search-not-found__description {
  font-size: 1rem;
  color: var(--gk-color-on-surface-muted);
  margin: 0;
  line-height: 1.5;
}

.search-not-found__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

@media (max-width: 600px) {
  .search-not-found {
    min-height: 300px;
    padding: 16px;
  }

  .search-not-found__actions {
    flex-direction: column;
    align-items: stretch;
  }
}
</style>
