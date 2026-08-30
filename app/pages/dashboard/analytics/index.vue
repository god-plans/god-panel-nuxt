<template>
  <div>
    <PageHeader
      :title="t('dashboard.analytics')"
      :subtitle="t('dashboard.analyticsDescription')"
    />

    <div class="analytics-grid">
      <StatCard
        v-for="metric in metrics"
        :key="metric.label"
        :icon="metric.icon"
        :label="t(metric.label)"
        :value="metric.value"
        :tone="metric.tone"
        :change="t(metric.change, { value: metric.delta })"
        :change-tone="metric.changeTone"
      />
    </div>

    <div class="analytics-columns">
      <PanelCard :title="t('pages.analytics.trafficOverview')" padding="lg">
        <EmptyState
          bordered
          icon="chart-areaspline"
          :title="t('pages.analytics.chartsComingSoon')"
          :description="t('pages.analytics.chartsHint')"
        />
      </PanelCard>

      <PanelCard :title="t('pages.analytics.topPages')" padding="lg">
        <ul class="rows">
          <li v-for="page in topPages" :key="page.path" class="rows__item">
            <span class="rows__label">{{ page.path }}</span>
            <span class="rows__value">{{ page.views.toLocaleString() }}</span>
          </li>
        </ul>
      </PanelCard>
    </div>

    <div class="analytics-columns analytics-columns--even">
      <PanelCard :title="t('pages.analytics.deviceBreakdown')" padding="lg">
        <div class="bars">
          <div v-for="device in devices" :key="device.name" class="bars__row">
            <div class="bars__head">
              <span class="bars__name">
                <AppIcon :name="device.icon" :size="18" />
                {{ t(device.name) }}
              </span>
              <span class="bars__pct">{{ device.pct }}%</span>
            </div>
            <div
              class="bars__track"
              role="meter"
              :aria-valuenow="device.pct"
              aria-valuemin="0"
              aria-valuemax="100"
              :aria-label="t(device.name)"
            >
              <div
                class="bars__fill"
                :style="{ width: `${device.pct}%`, background: `var(--gk-color-${device.tone})` }"
              />
            </div>
          </div>
        </div>
      </PanelCard>

      <PanelCard :title="t('pages.analytics.geographicData')" padding="lg">
        <ul class="rows">
          <li v-for="row in geo" :key="row.country" class="rows__item">
            <span class="rows__label">{{ row.country }}</span>
            <span class="rows__value rows__value--accent">{{ row.pct }}%</span>
          </li>
        </ul>
      </PanelCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Sample figures — replace with your analytics source.
const metrics = [
  { label: 'dashboard.pageViews', value: '45,231', icon: 'eye', tone: 'primary', change: 'dashboard.sinceLastMonth', delta: '+12.5%', changeTone: 'up' },
  { label: 'pages.analytics.uniqueVisitors', value: '12,543', icon: 'account-multiple', tone: 'success', change: 'dashboard.sinceLastMonth', delta: '+8.2%', changeTone: 'up' },
  { label: 'pages.analytics.avgSession', value: '4m 32s', icon: 'clock-outline', tone: 'warning', change: 'dashboard.sinceLastMonth', delta: '-2.1%', changeTone: 'down' },
  // A falling bounce rate is an improvement, so this delta reads as positive.
  { label: 'pages.analytics.bounceRate', value: '24.3%', icon: 'exit-run', tone: 'danger', change: 'dashboard.sinceLastMonth', delta: '-5.4%', changeTone: 'up' },
] as const

const topPages = [
  { path: '/dashboard', views: 8542 },
  { path: '/products', views: 6231 },
  { path: '/analytics', views: 4128 },
  { path: '/users', views: 3542 },
  { path: '/settings', views: 2891 },
]

const devices = [
  { name: 'pages.analytics.desktop', pct: 65, icon: 'monitor', tone: 'primary' },
  { name: 'pages.analytics.mobile', pct: 28, icon: 'cellphone', tone: 'success' },
  { name: 'pages.analytics.tablet', pct: 7, icon: 'tablet', tone: 'warning' },
] as const

const geo = [
  { country: 'United States', pct: 34 },
  { country: 'United Kingdom', pct: 22 },
  { country: 'Germany', pct: 18 },
  { country: 'France', pct: 12 },
  { country: 'Canada', pct: 8 },
  { country: 'Others', pct: 6 },
]

definePageMeta({ layout: 'dashboard', middleware: 'auth' })
useHead({ title: 'Analytics — God Panel' })
</script>

<style scoped>
.analytics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.analytics-columns {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

@media (min-width: 1024px) {
  .analytics-columns {
    grid-template-columns: 2fr 1fr;
  }

  .analytics-columns--even {
    grid-template-columns: 1fr 1fr;
  }
}

.rows {
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
}

.rows__item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.625rem 0;
  border-bottom: 1px solid var(--gk-color-border);
}

.rows__item:last-child {
  border-bottom: 0;
}

.rows__label {
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.875rem;
  font-weight: 500;
}

.rows__value {
  flex-shrink: 0;
  font-size: 0.875rem;
  color: var(--gk-color-on-surface-muted);
}

.rows__value--accent {
  font-weight: 600;
  color: var(--gk-color-primary);
}

.bars {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.bars__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.375rem;
  font-size: 0.875rem;
}

.bars__name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
}

.bars__pct {
  font-weight: 600;
}

.bars__track {
  height: 8px;
  border-radius: 999px;
  background: var(--gk-color-border);
  overflow: hidden;
}

.bars__fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.3s ease;
}
</style>
