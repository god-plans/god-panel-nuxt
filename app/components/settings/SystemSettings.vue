<template>
  <div class="system-settings">
    <v-alert
      type="info"
      variant="tonal"
      class="mb-6"
      prepend-icon="mdi-information"
    >
      <strong>{{ t('common.comingSoon') }}:</strong> {{ t('settings.system.title') }} {{ t('common.comingSoon').toLowerCase() }}
    </v-alert>

    <v-row>
      <!-- System Preferences -->
      <v-col cols="12" lg="8">
        <!-- Performance Settings -->
        <v-card class="system-card" elevation="0">
          <v-card-title class="text-h6 mb-4">
            <v-icon class="me-2">mdi-speedometer</v-icon>
            {{ t('settings.system.performance.title') }}
          </v-card-title>

          <v-card-text>
            <div class="system-group">
              <div class="setting-item">
                <div class="setting-content">
                  <div class="setting-title">{{ t('settings.system.performance.animations') }}</div>
                  <div class="setting-description">{{ t('settings.system.performance.animationsDesc') }}</div>
                </div>
                <v-switch
                  v-model="system.animationsEnabled"
                  color="primary"
                  density="compact"
                  hide-details
                />
              </div>

              <div class="setting-item">
                <div class="setting-content">
                  <div class="setting-title">{{ t('settings.system.performance.autoSave') }}</div>
                  <div class="setting-description">{{ t('settings.system.performance.autoSaveDesc') }}</div>
                </div>
                <v-switch
                  v-model="system.autoSaveEnabled"
                  color="primary"
                  density="compact"
                  hide-details
                />
              </div>

              <div class="setting-item">
                <div class="setting-content">
                  <div class="setting-title">{{ t('settings.system.performance.preload') }}</div>
                  <div class="setting-description">{{ t('settings.system.performance.preloadDesc') }}</div>
                </div>
                <v-switch
                  v-model="system.preloadEnabled"
                  color="primary"
                  density="compact"
                  hide-details
                />
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Privacy & Security -->
        <v-card class="system-card mt-6" elevation="0">
          <v-card-title class="text-h6 mb-4">
            <v-icon class="me-2">mdi-shield-account</v-icon>
            {{ t('settings.system.privacy.title') }}
          </v-card-title>

          <v-card-text>
            <div class="system-group">
              <div class="setting-item">
                <div class="setting-content">
                  <div class="setting-title">{{ t('settings.system.privacy.analytics') }}</div>
                  <div class="setting-description">{{ t('settings.system.privacy.analyticsDesc') }}</div>
                </div>
                <v-switch
                  v-model="system.analyticsEnabled"
                  color="primary"
                  density="compact"
                  hide-details
                />
              </div>

              <div class="setting-item">
                <div class="setting-content">
                  <div class="setting-title">{{ t('settings.system.privacy.crashReports') }}</div>
                  <div class="setting-description">{{ t('settings.system.privacy.crashReportsDesc') }}</div>
                </div>
                <v-switch
                  v-model="system.crashReportsEnabled"
                  color="primary"
                  density="compact"
                  hide-details
                />
              </div>

              <div class="setting-item">
                <div class="setting-content">
                  <div class="setting-title">{{ t('settings.system.privacy.dataCollection') }}</div>
                  <div class="setting-description">{{ t('settings.system.privacy.dataCollectionDesc') }}</div>
                </div>
                <v-select
                  v-model="system.dataCollectionLevel"
                  :items="dataCollectionOptions"
                  variant="outlined"
                  density="compact"
                  hide-details
                  style="max-width: 200px;"
                />
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Storage Management -->
        <v-card class="system-card mt-6" elevation="0">
          <v-card-title class="text-h6 mb-4">
            <v-icon class="me-2">mdi-harddisk</v-icon>
            {{ t('settings.system.storage.title') }}
          </v-card-title>

          <v-card-text>
            <div class="storage-info">
              <div class="storage-stat">
                <div class="storage-label">{{ t('settings.system.storage.used') }}</div>
                <div class="storage-value">{{ storage.used }} GB</div>
                <div class="storage-bar">
                  <v-progress-linear
                    :value="storage.percentage"
                    color="primary"
                    height="8"
                    rounded
                  />
                </div>
              </div>

              <div class="storage-details">
                <div class="detail-item">
                  <span>{{ t('settings.system.storage.available') }}</span>
                  <span>{{ storage.available }} GB</span>
                </div>
                <div class="detail-item">
                  <span>{{ t('settings.system.storage.total') }}</span>
                  <span>{{ storage.total }} GB</span>
                </div>
              </div>
            </div>

            <v-divider class="my-6" />

            <div class="storage-actions">
              <v-btn variant="outlined" @click="clearCache" class="me-3">
                <v-icon class="me-2">mdi-broom</v-icon>
                {{ t('settings.system.storage.clearCache') }}
              </v-btn>
              <v-btn variant="outlined" @click="clearData">
                <v-icon class="me-2">mdi-delete</v-icon>
                {{ t('settings.system.storage.clearData') }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Advanced Settings -->
        <v-card class="system-card mt-6" elevation="0">
          <v-card-title class="text-h6 mb-4">
            <v-icon class="me-2">mdi-cog-outline</v-icon>
            {{ t('settings.system.advanced.title') }}
          </v-card-title>

          <v-card-text>
            <div class="system-group">
              <div class="setting-item">
                <div class="setting-content">
                  <div class="setting-title">{{ t('settings.system.advanced.debugMode') }}</div>
                  <div class="setting-description">{{ t('settings.system.advanced.debugModeDesc') }}</div>
                </div>
                <v-switch
                  v-model="system.debugMode"
                  color="warning"
                  density="compact"
                  hide-details
                />
              </div>

              <div class="setting-item">
                <div class="setting-content">
                  <div class="setting-title">{{ t('settings.system.advanced.developerTools') }}</div>
                  <div class="setting-description">{{ t('settings.system.advanced.developerToolsDesc') }}</div>
                </div>
                <v-switch
                  v-model="system.developerTools"
                  color="warning"
                  density="compact"
                  hide-details
                />
              </div>

              <div class="setting-item">
                <div class="setting-content">
                  <div class="setting-title">{{ t('settings.system.advanced.experimental') }}</div>
                  <div class="setting-description">{{ t('settings.system.advanced.experimentalDesc') }}</div>
                </div>
                <v-switch
                  v-model="system.experimentalFeatures"
                  color="error"
                  density="compact"
                  hide-details
                />
              </div>
            </div>

            <v-alert
              type="warning"
              variant="tonal"
              class="mt-6"
              v-if="system.experimentalFeatures"
            >
              <template #prepend>
                <v-icon>mdi-alert</v-icon>
              </template>
              {{ t('settings.system.advanced.experimentalWarning') }}
            </v-alert>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- System Information & Actions -->
      <v-col cols="12" lg="4">
        <!-- System Information -->
        <v-card class="info-card" elevation="0">
          <v-card-title class="text-h6">
            <v-icon class="me-2">mdi-information</v-icon>
            {{ t('settings.system.info.title') }}
          </v-card-title>

          <v-card-text>
            <div class="system-info">
              <div class="info-item">
                <span class="info-label">{{ t('settings.system.info.version') }}</span>
                <span class="info-value">{{ systemInfo.version }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ t('settings.system.info.build') }}</span>
                <span class="info-value">{{ systemInfo.build }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ t('settings.system.info.os') }}</span>
                <span class="info-value">{{ systemInfo.os }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ t('settings.system.info.browser') }}</span>
                <span class="info-value">{{ systemInfo.browser }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">{{ t('settings.system.info.lastUpdate') }}</span>
                <span class="info-value">{{ systemInfo.lastUpdate }}</span>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- System Actions -->
        <v-card class="actions-card mt-6" elevation="0">
          <v-card-title class="text-h6">
            <v-icon class="me-2">mdi-tools</v-icon>
            {{ t('settings.system.actions.title') }}
          </v-card-title>

          <v-card-text>
            <div class="system-actions">
              <v-btn
                variant="outlined"
                block
                class="mb-3"
                @click="checkUpdates"
              >
                <v-icon class="me-2">mdi-update</v-icon>
                {{ t('settings.system.actions.checkUpdates') }}
              </v-btn>

              <v-btn
                variant="outlined"
                block
                class="mb-3"
                @click="exportLogs"
              >
                <v-icon class="me-2">mdi-file-download</v-icon>
                {{ t('settings.system.actions.exportLogs') }}
              </v-btn>

              <v-btn
                variant="outlined"
                block
                class="mb-3"
                @click="resetSettings"
                color="warning"
              >
                <v-icon class="me-2">mdi-refresh</v-icon>
                {{ t('settings.system.actions.resetSettings') }}
              </v-btn>

              <v-btn
                variant="outlined"
                block
                color="error"
                @click="factoryReset"
              >
                <v-icon class="me-2">mdi-factory</v-icon>
                {{ t('settings.system.actions.factoryReset') }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Performance Metrics -->
        <v-card class="metrics-card mt-6" elevation="0">
          <v-card-title class="text-h6">
            <v-icon class="me-2">mdi-chart-line</v-icon>
            {{ t('settings.system.metrics.title') }}
          </v-card-title>

          <v-card-text>
            <div class="metrics-grid">
              <div class="metric-item">
                <div class="metric-value">{{ metrics.cpu }}%</div>
                <div class="metric-label">{{ t('settings.system.metrics.cpu') }}</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">{{ metrics.memory }}%</div>
                <div class="metric-label">{{ t('settings.system.metrics.memory') }}</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">{{ metrics.storage }}%</div>
                <div class="metric-label">{{ t('settings.system.metrics.storage') }}</div>
              </div>
              <div class="metric-item">
                <div class="metric-value">{{ metrics.network }}</div>
                <div class="metric-label">{{ t('settings.system.metrics.network') }}</div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

// Composables
const { t } = useI18n()

// System settings
const system = reactive({
  animationsEnabled: true,
  autoSaveEnabled: true,
  preloadEnabled: false,
  analyticsEnabled: true,
  crashReportsEnabled: true,
  dataCollectionLevel: 'minimal',
  debugMode: false,
  developerTools: false,
  experimentalFeatures: false
})

// Data collection options
const dataCollectionOptions = ref([
  { title: t('settings.system.privacy.minimal'), value: 'minimal' },
  { title: t('settings.system.privacy.standard'), value: 'standard' },
  { title: t('settings.system.privacy.extensive'), value: 'extensive' }
])

// Storage information
const storage = reactive({
  used: 2.4,
  available: 7.6,
  total: 10,
  percentage: 24
})

// System information
const systemInfo = reactive({
  version: '1.0.0',
  build: '2024.01.15',
  os: 'macOS 14.0',
  browser: 'Chrome 120.0',
  lastUpdate: '2 days ago'
})

// Performance metrics
const metrics = reactive({
  cpu: 15,
  memory: 42,
  storage: 24,
  network: '45ms'
})

// Methods
const clearCache = () => {
  console.log('Clearing cache...')
}

const clearData = () => {
  console.log('Clearing data...')
}

const checkUpdates = () => {
  console.log('Checking for updates...')
}

const exportLogs = () => {
  console.log('Exporting logs...')
}

const resetSettings = () => {
  console.log('Resetting settings...')
}

const factoryReset = () => {
  console.log('Factory reset...')
}
</script>

<style scoped>
.system-settings {
  width: 100%;
}

.system-card,
.info-card,
.actions-card,
.metrics-card {
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.2);
  border-radius: 12px;
}

.system-group {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.1);
  border-radius: 8px;
  background: rgba(var(--v-theme-surface-variant), 0.02);
}

.setting-content {
  flex: 1;
}

.setting-title {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 4px;
}

.setting-description {
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.4;
}

.storage-info {
  margin-bottom: 16px;
}

.storage-stat {
  margin-bottom: 16px;
}

.storage-label {
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 8px;
}

.storage-value {
  font-size: 24px;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 8px;
}

.storage-bar {
  margin-bottom: 16px;
}

.storage-details {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(var(--v-theme-outline-variant), 0.1);
}

.detail-item:last-child {
  border-bottom: none;
}

.storage-actions {
  display: flex;
  gap: 12px;
}

.system-info {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid rgba(var(--v-theme-outline-variant), 0.1);
}

.info-item:last-child {
  border-bottom: none;
}

.info-label {
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface-variant));
}

.info-value {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.system-actions .v-btn {
  justify-content: flex-start;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.metric-item {
  text-align: center;
  padding: 16px;
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.1);
  border-radius: 8px;
  background: rgba(var(--v-theme-surface-variant), 0.02);
}

.metric-value {
  font-size: 24px;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  margin-bottom: 4px;
}

.metric-label {
  font-size: 12px;
  color: rgb(var(--v-theme-on-surface-variant));
  font-weight: 500;
}

@media (max-width: 768px) {
  .setting-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .storage-details {
    flex-direction: column;
    gap: 8px;
  }

  .storage-actions {
    flex-direction: column;
  }

  .storage-actions .v-btn {
    width: 100%;
  }

  .metrics-grid {
    grid-template-columns: 1fr;
  }
}
</style>

