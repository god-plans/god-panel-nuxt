<template>
  <div class="dashboard-overview w-full max-w-[1600px] mx-auto px-2">
    <div class="mb-8">
      <h1 class="text-h4 font-bold mb-2">{{ t('pages.dashboard.welcomeBack') }}</h1>
      <p class="text-body-1 opacity-80">{{ t('pages.dashboard.welcomeSubtitle') }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="stat-card rounded-xl border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-4 shadow-sm"
      >
        <div class="flex items-center gap-3">
          <div
            class="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-white"
            :class="stat.avatarClass"
          >
            <AppIcon :name="stat.icon" :size="22" class="text-white" />
          </div>
          <div>
            <div class="text-h6 font-bold">{{ stat.value }}</div>
            <div class="text-caption opacity-70">{{ t(stat.label) }}</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div class="lg:col-span-8 rounded-xl border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-4 shadow-sm">
        <h2 class="text-lg font-semibold mb-4">{{ t('pages.dashboard.analyticsOverview') }}</h2>
        <div class="chart-placeholder flex flex-col items-center justify-center py-12 text-center">
          <AppIcon name="chart-line" :size="64" class="opacity-30" />
          <p class="text-body-1 mt-4">{{ t('dashboard.chartDisplay') }}</p>
        </div>
      </div>

      <div class="lg:col-span-4 rounded-xl border border-[var(--gk-color-border)] bg-[var(--gk-color-surface)] p-4 shadow-sm">
        <h2 class="text-lg font-semibold mb-4">{{ t('pages.dashboard.recentActivity') }}</h2>
        <ul class="space-y-4 list-none p-0 m-0">
          <li v-for="(item, i) in items" :key="i" class="flex gap-3 items-start">
            <div
              class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white"
              :class="item.avatarClass"
            >
              <AppIcon :name="item.icon" :size="16" class="text-white" />
            </div>
            <div>
              <div class="text-body-2">{{ t(item.title) }}</div>
              <div class="text-caption opacity-70">{{ item.time }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()

const stats = [
  { value: '2,543', label: 'dashboard.totalUsers', icon: 'account-group', avatarClass: 'bg-[var(--gk-color-primary)]' },
  { value: '156', label: 'dashboard.newOrders', icon: 'cart-plus', avatarClass: 'bg-[var(--gk-color-success)]' },
  { value: '89', label: 'dashboard.products', icon: 'package-variant', avatarClass: 'bg-[var(--gk-color-warning)]' },
  { value: '$12,543', label: 'dashboard.revenue', icon: 'chart-line', avatarClass: 'bg-[var(--gk-color-info)]' },
]

const items = [
  { title: 'pages.dashboard.newUserRegistered', time: '2 minutes ago', icon: 'account-plus', avatarClass: 'bg-[var(--gk-color-primary)]' },
  { title: 'pages.dashboard.orderCompleted', time: '5 minutes ago', icon: 'cart-plus', avatarClass: 'bg-[var(--gk-color-success)]' },
  { title: 'pages.dashboard.productUpdated', time: '10 minutes ago', icon: 'package-variant', avatarClass: 'bg-[var(--gk-color-warning)]' },
]

definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

useHead({
  title: 'Dashboard - God Panel'
})
</script>

<style scoped>
.text-h4 {
  font-size: 1.5rem;
  line-height: 2rem;
}
.text-h6 {
  font-size: 1.125rem;
}
.text-body-1 {
  font-size: 1rem;
}
.text-body-2 {
  font-size: 0.875rem;
}
.text-caption {
  font-size: 0.75rem;
}
</style>
