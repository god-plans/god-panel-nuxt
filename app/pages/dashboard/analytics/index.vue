<template>
  <v-container fluid>
    <!-- Page Header -->
    <v-row class="mb-6">
      <v-col cols="12">
        <div class="page-header">
          <h1 class="text-h4 font-weight-bold">{{ t('dashboard.analytics') }}</h1>
          <p class="text-body-1 text-medium-emphasis mt-2">{{ t('dashboard.analyticsDescription') }}</p>
        </div>
      </v-col>
    </v-row>

    <!-- Analytics Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" lg="3">
        <v-card class="metric-card" >
          <v-card-text class="pa-4">
            <div class="metric-header">
              <v-icon color="primary" size="24">mdi-eye</v-icon>
              <span class="metric-label">{{ t('dashboard.pageViews') }}</span>
            </div>
            <div class="metric-value">45,231</div>
            <div class="metric-change positive">
              <v-icon size="16">mdi-trending-up</v-icon>
              +12.5% from last month
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card class="metric-card" >
          <v-card-text class="pa-4">
            <div class="metric-header">
              <v-icon color="success" size="24">mdi-account-multiple</v-icon>
              <span class="metric-label">Unique Visitors</span>
            </div>
            <div class="metric-value">12,543</div>
            <div class="metric-change positive">
              <v-icon size="16">mdi-trending-up</v-icon>
              +8.2% from last month
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card class="metric-card" >
          <v-card-text class="pa-4">
            <div class="metric-header">
              <v-icon color="warning" size="24">mdi-clock-outline</v-icon>
              <span class="metric-label">Avg. Session</span>
            </div>
            <div class="metric-value">4m 32s</div>
            <div class="metric-change negative">
              <v-icon size="16">mdi-trending-down</v-icon>
              -2.1% from last month
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <v-card class="metric-card" >
          <v-card-text class="pa-4">
            <div class="metric-header">
              <v-icon color="error" size="24">mdi-exit-run</v-icon>
              <span class="metric-label">Bounce Rate</span>
            </div>
            <div class="metric-value">24.3%</div>
            <div class="metric-change positive">
              <v-icon size="16">mdi-trending-down</v-icon>
              -5.4% from last month
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts Section -->
    <v-row class="mb-6">
      <v-col cols="12" lg="8">
        <v-card >
          <v-card-title>Traffic Overview</v-card-title>
          <v-card-text>
            <div class="chart-container">
              <div class="chart-placeholder">
                <v-icon size="80" color="grey-lighten-1">mdi-chart-areaspline</v-icon>
                <p class="text-h6 mt-4">Traffic Chart</p>
                <p class="text-body-2 text-medium-emphasis">Interactive chart would be displayed here</p>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card >
          <v-card-title>Top Pages</v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item>
                <v-list-item-title>/dashboard</v-list-item-title>
                <v-list-item-subtitle>8,542 views</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>/products</v-list-item-title>
                <v-list-item-subtitle>6,231 views</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>/analytics</v-list-item-title>
                <v-list-item-subtitle>4,128 views</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>/users</v-list-item-title>
                <v-list-item-subtitle>3,542 views</v-list-item-subtitle>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>/settings</v-list-item-title>
                <v-list-item-subtitle>2,891 views</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Additional Analytics -->
    <v-row>
      <v-col cols="12" md="6">
        <v-card >
          <v-card-title>Device Breakdown</v-card-title>
          <v-card-text>
            <div class="device-stats">
              <div class="device-item">
                <div class="device-label">
                  <v-icon color="primary" class="me-2">mdi-monitor</v-icon>
                  Desktop
                </div>
                <div class="device-value">65%</div>
              </div>
              <v-progress-linear
                v-model="desktopProgress"
                color="primary"
                height="8"
                class="mb-4"
              />

              <div class="device-item">
                <div class="device-label">
                  <v-icon color="success" class="me-2">mdi-cellphone</v-icon>
                  Mobile
                </div>
                <div class="device-value">28%</div>
              </div>
              <v-progress-linear
                v-model="mobileProgress"
                color="success"
                height="8"
                class="mb-4"
              />

              <div class="device-item">
                <div class="device-label">
                  <v-icon color="warning" class="me-2">mdi-tablet</v-icon>
                  Tablet
                </div>
                <div class="device-value">7%</div>
              </div>
              <v-progress-linear
                v-model="tabletProgress"
                color="warning"
                height="8"
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card >
          <v-card-title>Geographic Data</v-card-title>
          <v-card-text>
            <div class="geo-stats">
              <div class="geo-item">
                <div class="geo-country">United States</div>
                <div class="geo-percentage">34%</div>
              </div>
              <div class="geo-item">
                <div class="geo-country">United Kingdom</div>
                <div class="geo-percentage">22%</div>
              </div>
              <div class="geo-item">
                <div class="geo-country">Germany</div>
                <div class="geo-percentage">18%</div>
              </div>
              <div class="geo-item">
                <div class="geo-country">France</div>
                <div class="geo-percentage">12%</div>
              </div>
              <div class="geo-item">
                <div class="geo-country">Canada</div>
                <div class="geo-percentage">8%</div>
              </div>
              <div class="geo-item">
                <div class="geo-country">Others</div>
                <div class="geo-percentage">6%</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
useHead({
  title: 'Analytics - God Panel'
})

// Reactive data for progress bars
const desktopProgress = ref(65)
const mobileProgress = ref(28)
const tabletProgress = ref(7)
</script>

<style scoped>
.page-header {
  margin-bottom: 16px;
}

.metric-card {
  height: 100%;
  transition: transform 0.2s ease;
}

.metric-card:hover {
  transform: translateY(-2px);
}

.metric-header {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
}

.metric-label {
  font-size: 0.875rem;
  color: rgb(var(--v-theme-on-surface-variant));
  margin-left: 8px;
}

.metric-value {
  font-size: 2rem;
  font-weight: 700;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 8px;
}

.metric-change {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 4px;
}

.metric-change.positive {
  color: rgb(var(--v-theme-success));
}

.metric-change.negative {
  color: rgb(var(--v-theme-error));
}

.chart-container {
  height: 300px;
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: rgb(var(--v-theme-on-surface-variant));
}

.device-stats {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.device-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.device-label {
  display: flex;
  align-items: center;
  font-weight: 500;
}

.device-value {
  font-weight: 600;
}

.geo-stats {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.geo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgb(var(--v-theme-surface-variant));
}

.geo-item:last-child {
  border-bottom: none;
}

.geo-country {
  font-weight: 500;
}

.geo-percentage {
  font-weight: 600;
  color: rgb(var(--v-theme-primary));
}
</style>
