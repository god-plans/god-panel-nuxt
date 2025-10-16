<template>
  <v-container fluid class="dashboard-overview">
    <!-- Welcome Section -->
    <v-row>
      <v-col cols="12">
        <div class="welcome-section">
          <h1 class="text-h4 font-weight-bold mb-2">Welcome back!</h1>
          <p class="text-body-1 text-medium-emphasis">Here's what's happening with your projects today.</p>
        </div>
      </v-col>
    </v-row>

    <!-- Stats Cards -->
    <v-row class="mb-6">
      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" elevation="2">
          <v-card-text class="pa-4">
            <div class="d-flex align-center">
              <v-avatar size="48" color="primary" class="me-3">
                <v-icon color="white">mdi-account-group</v-icon>
              </v-avatar>
              <div>
                <div class="text-h6 font-weight-bold">2,543</div>
                <div class="text-caption text-medium-emphasis">Total Users</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" elevation="2">
          <v-card-text class="pa-4">
            <div class="d-flex align-center">
              <v-avatar size="48" color="success" class="me-3">
                <v-icon color="white">mdi-shopping-cart</v-icon>
              </v-avatar>
              <div>
                <div class="text-h6 font-weight-bold">156</div>
                <div class="text-caption text-medium-emphasis">New Orders</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" elevation="2">
          <v-card-text class="pa-4">
            <div class="d-flex align-center">
              <v-avatar size="48" color="warning" class="me-3">
                <v-icon color="white">mdi-package-variant</v-icon>
              </v-avatar>
              <div>
                <div class="text-h6 font-weight-bold">89</div>
                <div class="text-caption text-medium-emphasis">Products</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6" md="3">
        <v-card class="stat-card" elevation="2">
          <v-card-text class="pa-4">
            <div class="d-flex align-center">
              <v-avatar size="48" color="info" class="me-3">
                <v-icon color="white">mdi-chart-line</v-icon>
              </v-avatar>
              <div>
                <div class="text-h6 font-weight-bold">$12,543</div>
                <div class="text-caption text-medium-emphasis">Revenue</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- Charts and Tables -->
    <v-row>
      <v-col cols="12" md="8">
        <v-card class="chart-card" elevation="2">
          <v-card-title>Analytics Overview</v-card-title>
          <v-card-text>
            <div class="chart-placeholder">
              <v-icon size="64" color="grey-lighten-1">mdi-chart-line</v-icon>
              <p class="text-body-1 mt-4">Chart will be displayed here</p>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card class="recent-activity" elevation="2">
          <v-card-title>Recent Activity</v-card-title>
          <v-card-text>
            <v-list density="compact">
              <v-list-item>
                <template #prepend>
                  <v-avatar size="32" color="primary">
                    <v-icon size="16" color="white">mdi-account-plus</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2">New user registered</v-list-item-title>
                <v-list-item-subtitle class="text-caption">2 minutes ago</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template #prepend>
                  <v-avatar size="32" color="success">
                    <v-icon size="16" color="white">mdi-shopping-cart</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2">Order completed</v-list-item-title>
                <v-list-item-subtitle class="text-caption">5 minutes ago</v-list-item-subtitle>
              </v-list-item>

              <v-list-item>
                <template #prepend>
                  <v-avatar size="32" color="warning">
                    <v-icon size="16" color="white">mdi-package-variant</v-icon>
                  </v-avatar>
                </template>
                <v-list-item-title class="text-body-2">Product updated</v-list-item-title>
                <v-list-item-subtitle class="text-caption">10 minutes ago</v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
useHead({
  title: 'Dashboard - God Panel'
})
</script>

<style scoped>
.welcome-section {
  margin-bottom: 24px;
}

.stat-card {
  transition: transform 0.2s ease;
}

.stat-card:hover {
  transform: translateY(-2px);
}

.chart-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 200px;
  color: rgb(var(--v-theme-on-surface-variant));
}

.recent-activity .v-list-item {
  min-height: 48px;
}
</style>
