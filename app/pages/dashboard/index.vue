<template>
  <div>
    <PageHeader
      :title="t('pages.dashboard.welcomeBack')"
      :subtitle="t('pages.dashboard.welcomeSubtitle')"
    />

    <div class="dashboard-grid">
      <StatCard
        v-for="stat in stats"
        :key="stat.label"
        :icon="stat.icon"
        :label="t(stat.label)"
        :value="stat.value"
        :tone="stat.tone"
        :change="stat.change"
      />
    </div>

    <div class="dashboard-columns">
      <PanelCard :title="t('pages.dashboard.analyticsOverview')" padding="lg" class="dashboard-columns__main">
        <EmptyState
          bordered
          icon="chart-line"
          :title="t('dashboard.chartDisplay')"
          :description="t('dashboard.chartDisplayHint')"
        />
      </PanelCard>

      <PanelCard :title="t('pages.dashboard.recentActivity')" padding="lg">
        <ul class="activity">
          <li v-for="item in activity" :key="item.title" class="activity__item">
            <span class="activity__icon" :style="{ '--tone': `var(--gk-color-${item.tone})` }">
              <AppIcon :name="item.icon" :size="16" />
            </span>
            <span class="activity__text">
              <span class="activity__title">{{ t(item.title) }}</span>
              <span class="activity__time">{{ t('common.minutesAgo', { count: item.minutes }) }}</span>
            </span>
          </li>
        </ul>
      </PanelCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Sample figures so the starter renders something meaningful with no backend.
// Swap for `const { data } = await useFetch('/dashboard/stats')` when yours is ready.
const stats = [
  { value: '2,543', label: 'dashboard.totalUsers', icon: 'account-group', tone: 'primary', change: '+12.5%' },
  { value: '156', label: 'dashboard.newOrders', icon: 'cart-plus', tone: 'success', change: '+8.2%' },
  { value: '89', label: 'dashboard.products', icon: 'package-variant', tone: 'warning', change: '+3.1%' },
  { value: '$12,543', label: 'dashboard.revenue', icon: 'chart-line', tone: 'info', change: '+22.4%' },
] as const

const activity = [
  { title: 'pages.dashboard.newUserRegistered', minutes: 2, icon: 'account-plus', tone: 'primary' },
  { title: 'pages.dashboard.orderCompleted', minutes: 5, icon: 'cart-plus', tone: 'success' },
  { title: 'pages.dashboard.productUpdated', minutes: 10, icon: 'package-variant', tone: 'warning' },
] as const

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Dashboard — God Panel' })
</script>

<style scoped>
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.dashboard-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .dashboard-columns {
    grid-template-columns: 2fr 1fr;
  }
}

.activity {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.activity__item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.activity__icon {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  background: var(--tone);
  color: var(--gk-color-text-on-primary, #fff);
}

.activity__text {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.activity__title {
  font-size: 0.875rem;
  line-height: 1.3;
}

.activity__time {
  font-size: 0.75rem;
  color: var(--gk-color-on-surface-muted);
}
</style>
