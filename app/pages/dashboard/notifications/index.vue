<template>
  <div>
    <PageHeader
      :title="t('settings.notifications')"
      :subtitle="t('pages.notifications.subtitle')"
    >
      <template #actions>
        <GkButton v-if="unread.length" variant="secondary" @click="markAllAsRead">
          <AppIcon name="check-circle" :size="18" class="me-2" />
          {{ t('settings.markAllRead') }}
        </GkButton>
      </template>
    </PageHeader>

    <PanelCard padding="none">
      <EmptyState
        v-if="!items.length"
        icon="bell"
        :title="t('settings.noNewNotifications')"
        :description="t('pages.notifications.emptyDescription')"
      />

      <ul v-else class="notifications">
        <li v-for="item in items" :key="item.id">
          <button
            type="button"
            class="notifications__row"
            :class="{ 'notifications__row--read': item.read }"
            @click="markAsRead(item.id)"
          >
            <span class="notifications__icon">
              <AppIcon :name="item.icon" :size="20" />
            </span>
            <span class="notifications__text">
              <span class="notifications__title">{{ item.title }}</span>
              <span class="notifications__message">{{ item.message }}</span>
            </span>
            <span v-if="!item.read" class="notifications__dot" :aria-label="t('pages.notifications.unread')" />
          </button>
        </li>
      </ul>
    </PanelCard>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { GkButton } from 'god-kit/vue'

const { t } = useI18n()
const { items, unread, markAsRead, markAllAsRead } = useNotifications()

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Notifications — God Panel' })
</script>

<style scoped>
.notifications {
  list-style: none;
  margin: 0;
  padding: 0;
}

.notifications__row {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  width: 100%;
  padding: 1rem 1.25rem;
  border: 0;
  border-bottom: 1px solid var(--gk-color-border);
  background: none;
  color: inherit;
  text-align: start;
  cursor: pointer;
}

.notifications li:last-child .notifications__row {
  border-bottom: 0;
}

.notifications__row:hover {
  background: color-mix(in srgb, var(--gk-color-primary) 6%, transparent);
}

.notifications__row--read {
  opacity: 0.6;
}

.notifications__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  border-radius: var(--panel-radius-sm);
  background: color-mix(in srgb, var(--gk-color-primary) 12%, transparent);
  color: var(--gk-color-primary);
}

.notifications__text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
  flex: 1 1 auto;
}

.notifications__title {
  font-size: 0.9375rem;
  font-weight: 600;
}

.notifications__message {
  font-size: 0.8125rem;
  color: var(--gk-color-on-surface-muted);
}

.notifications__dot {
  flex-shrink: 0;
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: var(--gk-color-primary);
}
</style>
