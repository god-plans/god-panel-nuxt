<template>
  <div class="search-not-found">
    <div class="search-not-found__content">
      <!-- Illustration/Icon -->
      <div class="search-not-found__illustration">
        <v-icon
          :icon="icon"
          size="120"
          :color="iconColor"
          class="search-not-found__icon"
        />
      </div>

      <!-- Title and Description -->
      <div class="search-not-found__text">
        <h2 class="search-not-found__title">{{ title }}</h2>
        <p class="search-not-found__description">{{ description }}</p>
      </div>

      <!-- Actions -->
      <div v-if="showAction" class="search-not-found__actions">
        <v-btn
          v-if="actionText && actionHandler"
          :color="actionColor"
          :variant="actionVariant"
          @click="actionHandler"
          class="search-not-found__action-btn"
        >
          {{ actionText }}
        </v-btn>

        <v-btn
          v-if="secondaryActionText && secondaryActionHandler"
          :color="secondaryActionColor"
          :variant="secondaryActionVariant"
          @click="secondaryActionHandler"
          class="search-not-found__action-btn"
        >
          {{ secondaryActionText }}
        </v-btn>
      </div>

      <!-- Additional Content Slot -->
      <div v-if="$slots.additional" class="search-not-found__additional">
        <slot name="additional" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

interface Props {
  title?: string
  description?: string
  icon?: string
  iconColor?: string
  showAction?: boolean
  actionText?: string
  actionColor?: string
  actionVariant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  actionHandler?: () => void
  secondaryActionText?: string
  secondaryActionColor?: string
  secondaryActionVariant?: 'elevated' | 'flat' | 'tonal' | 'outlined' | 'text' | 'plain'
  secondaryActionHandler?: () => void
}

const props = withDefaults(defineProps<Props>(), {
  title: 'No results found',
  description: 'Try adjusting your search or filter criteria.',
  icon: 'mdi-magnify',
  iconColor: 'grey-lighten-1',
  showAction: true,
  actionText: 'Clear filters',
  actionColor: 'primary',
  actionVariant: 'elevated',
  secondaryActionText: 'Go back',
  secondaryActionColor: 'grey',
  secondaryActionVariant: 'text'
})
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
  opacity: 0.6;
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

.search-not-found__icon {
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
}

.search-not-found__text {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.search-not-found__title {
  font-size: 1.5rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin: 0;
}

.search-not-found__description {
  font-size: 1rem;
  color: rgb(var(--v-theme-on-surface-variant));
  margin: 0;
  line-height: 1.5;
}

.search-not-found__actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
}

.search-not-found__action-btn {
  min-width: 120px;
}

.search-not-found__additional {
  width: 100%;
}

/* Responsive */
@media (max-width: 600px) {
  .search-not-found {
    min-height: 300px;
    padding: 16px;
  }

  .search-not-found__content {
    gap: 20px;
  }

  .search-not-found__title {
    font-size: 1.25rem;
  }

  .search-not-found__description {
    font-size: 0.875rem;
  }

  .search-not-found__actions {
    flex-direction: column;
    align-items: stretch;
  }

  .search-not-found__action-btn {
    width: 100%;
  }
}
</style>
