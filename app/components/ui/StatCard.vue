<template>
  <PanelCard interactive padding="md" class="stat-card">
    <div class="stat-card__row">
      <span class="stat-card__icon" :style="{ '--stat-tone': toneColor }">
        <AppIcon :name="icon" :size="22" />
      </span>

      <div class="stat-card__body">
        <p class="stat-card__label">{{ label }}</p>
        <p class="stat-card__value">{{ value }}</p>
      </div>
    </div>

    <p v-if="change" class="stat-card__change" :class="`stat-card__change--${changeTone}`">
      <AppIcon :name="changeTone === 'down' ? 'trending-down' : 'trending-up'" :size="16" />
      {{ change }}
    </p>
  </PanelCard>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import AppIcon from '~/components/ui/AppIcon.vue'
import PanelCard from '~/components/ui/PanelCard.vue'

/**
 * A single KPI tile. `tone` colours the icon; `changeTone` colours the delta —
 * they are separate because a falling number is often the good outcome
 * (bounce rate, error count).
 *
 * ```vue
 * <StatCard icon="cart-plus" label="Orders" value="156" tone="success" change="+8.2%" />
 * ```
 */
const props = withDefaults(
  defineProps<{
    icon: string
    label: string
    value: string | number
    tone?: 'primary' | 'success' | 'warning' | 'danger' | 'info'
    /** Delta text, e.g. `+12.5% from last month`. Omit to hide the row. */
    change?: string
    /** `up` renders green, `down` red. Set explicitly when down is good. */
    changeTone?: 'up' | 'down'
  }>(),
  { tone: 'primary', changeTone: 'up' }
)

const toneColor = computed(() => `var(--gk-color-${props.tone})`)
</script>

<style scoped>
.stat-card__row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
}

.stat-card__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: var(--stat-tone);
  color: var(--gk-color-text-on-primary, #fff);
}

.stat-card__body {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.stat-card__label {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1.25;
  color: var(--gk-color-on-surface-muted);
}

.stat-card__value {
  margin: 0;
  font-size: 1.375rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--gk-color-on-surface);
}

.stat-card__change {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  margin: 0.875rem 0 0;
  font-size: 0.75rem;
  font-weight: 500;
}

.stat-card__change--up {
  color: var(--gk-color-success);
}

.stat-card__change--down {
  color: var(--gk-color-danger);
}
</style>
