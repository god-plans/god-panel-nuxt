<template>
  <div class="w-full max-w-[1600px] mx-auto px-2">
    <div class="page-header mb-6">
      <h1 class="text-h4 font-bold">{{ t('dashboard.analytics') }}</h1>
      <p class="text-body-1 opacity-80 mt-2">{{ t('dashboard.analyticsDescription') }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div
        v-for="m in metrics"
        :key="m.label"
        class="metric-card rounded-xl border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-4 shadow-sm h-full transition-transform hover:-translate-y-0.5"
      >
        <div class="metric-header flex items-center mb-3">
          <AppIcon :name="m.icon" :size="24" :class="m.iconColor" />
          <span class="metric-label ms-2 text-sm opacity-80">{{ m.label }}</span>
        </div>
        <div class="metric-value text-3xl font-bold mb-2">{{ m.value }}</div>
        <div class="metric-change text-xs flex items-center gap-1" :class="m.changeClass">
          <AppIcon :name="m.trendIcon" :size="16" />
          {{ m.changeText }}
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
      <div class="lg:col-span-8 rounded-xl border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-4">
        <h2 class="text-lg font-semibold mb-4">Traffic Overview</h2>
        <div class="chart-container h-[300px] flex flex-col items-center justify-center text-center opacity-80">
          <AppIcon name="chart-areaspline" :size="80" class="opacity-40" />
          <p class="text-h6 mt-4">Traffic Chart</p>
          <p class="text-body-2">Interactive chart would be displayed here</p>
        </div>
      </div>

      <div class="lg:col-span-4 rounded-xl border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-4">
        <h2 class="text-lg font-semibold mb-4">Top Pages</h2>
        <ul class="space-y-3 list-none p-0 m-0">
          <li v-for="p in topPages" :key="p.path" class="flex flex-col border-b border-[var(--gk-color-border)] pb-2 last:border-0">
            <span class="font-medium">{{ p.path }}</span>
            <span class="text-sm opacity-70">{{ p.views }}</span>
          </li>
        </ul>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="rounded-xl border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-4">
        <h2 class="text-lg font-semibold mb-4">Device Breakdown</h2>
        <div class="device-stats flex flex-col gap-4">
          <div v-for="d in devices" :key="d.name">
            <div class="flex justify-between items-center mb-1">
              <span class="flex items-center gap-2 font-medium">
                <AppIcon :name="d.icon" :size="20" :class="d.iconColor" />
                {{ d.name }}
              </span>
              <span class="font-semibold">{{ d.pct }}%</span>
            </div>
            <div class="h-2 rounded-full bg-[var(--gk-color-border)] overflow-hidden">
              <div
                class="h-full rounded-full transition-all"
                :class="d.barClass"
                :style="{ width: d.pct + '%' }"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="rounded-xl border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-4">
        <h2 class="text-lg font-semibold mb-4">Geographic Data</h2>
        <div class="flex flex-col gap-3">
          <div
            v-for="g in geo"
            :key="g.country"
            class="flex justify-between py-2 border-b border-[var(--gk-color-border)] last:border-0"
          >
            <span class="font-medium">{{ g.country }}</span>
            <span class="font-semibold text-[var(--gk-color-primary)]">{{ g.pct }}%</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()

const metrics = [
  {
    label: t('dashboard.pageViews'),
    value: '45,231',
    icon: 'eye',
    iconColor: 'text-[var(--gk-color-primary)]',
    changeText: '+12.5% from last month',
    trendIcon: 'trending-up',
    changeClass: 'text-[var(--gk-color-success)]',
  },
  {
    label: 'Unique Visitors',
    value: '12,543',
    icon: 'account-multiple',
    iconColor: 'text-[var(--gk-color-success)]',
    changeText: '+8.2% from last month',
    trendIcon: 'trending-up',
    changeClass: 'text-[var(--gk-color-success)]',
  },
  {
    label: 'Avg. Session',
    value: '4m 32s',
    icon: 'clock-outline',
    iconColor: 'text-[var(--gk-color-warning)]',
    changeText: '-2.1% from last month',
    trendIcon: 'trending-down',
    changeClass: 'text-[var(--gk-color-danger)]',
  },
  {
    label: 'Bounce Rate',
    value: '24.3%',
    icon: 'exit-run',
    iconColor: 'text-[var(--gk-color-danger)]',
    changeText: '-5.4% from last month',
    trendIcon: 'trending-down',
    changeClass: 'text-[var(--gk-color-success)]',
  },
]

const topPages = [
  { path: '/dashboard', views: '8,542 views' },
  { path: '/products', views: '6,231 views' },
  { path: '/analytics', views: '4,128 views' },
  { path: '/users', views: '3,542 views' },
  { path: '/settings', views: '2,891 views' },
]

const devices = [
  { name: 'Desktop', pct: 65, icon: 'monitor', iconColor: 'text-[var(--gk-color-primary)]', barClass: 'bg-[var(--gk-color-primary)]' },
  { name: 'Mobile', pct: 28, icon: 'cellphone', iconColor: 'text-[var(--gk-color-success)]', barClass: 'bg-[var(--gk-color-success)]' },
  { name: 'Tablet', pct: 7, icon: 'tablet', iconColor: 'text-[var(--gk-color-warning)]', barClass: 'bg-[var(--gk-color-warning)]' },
]

const geo = [
  { country: 'United States', pct: 34 },
  { country: 'United Kingdom', pct: 22 },
  { country: 'Germany', pct: 18 },
  { country: 'France', pct: 12 },
  { country: 'Canada', pct: 8 },
  { country: 'Others', pct: 6 },
]

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

useHead({
  title: 'Analytics - God Panel'
})
</script>

<style scoped>
.text-h4 {
  font-size: 1.5rem;
}
.text-h6 {
  font-size: 1.125rem;
}
.text-body-2 {
  font-size: 0.875rem;
}
</style>
