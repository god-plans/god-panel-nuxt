<template>
  <DashboardContent max-width="xl">
    <div class="settings-page">
      <!-- Page Header -->
      <div class="page-header">
        <div class="header-content">
          <div class="header-icon">
            <v-icon size="32" color="primary">mdi-cog-outline</v-icon>
          </div>
          <div class="header-text">
            <h1 class="text-h3 mb-2">{{ t('pages.settings.title') }}</h1>
            <p class="text-body-1 text-medium-emphasis">
              {{ t('pages.settings.subtitle') }}
            </p>
          </div>
        </div>
        <v-spacer />
        <div class="header-actions">
          <v-btn
            variant="outlined"
            @click="exportSettings"
            class="me-2"
          >
            <v-icon class="me-2">mdi-download</v-icon>
            {{ t('settings.export') }}
          </v-btn>
          <v-btn
            variant="outlined"
            @click="importSettings"
          >
            <v-icon class="me-2">mdi-upload</v-icon>
            {{ t('settings.import') }}
          </v-btn>
        </div>
      </div>

      <!-- Settings Tabs -->
      <v-card class="settings-container" elevation="0">
        <v-tabs
          v-model="activeTab"
          color="primary"
          class="settings-tabs"
          grow
        >
          <v-tab value="appearance" class="tab-item">
            <v-icon class="me-2">mdi-palette</v-icon>
            {{ t('settings.appearance') }}
          </v-tab>
          <v-tab value="account" class="tab-item">
            <v-icon class="me-2">mdi-account</v-icon>
            {{ t('settings.account') }}
          </v-tab>
          <v-tab value="notifications" class="tab-item">
            <v-icon class="me-2">mdi-bell</v-icon>
            {{ t('settings.notifications') }}
          </v-tab>
          <v-tab value="system" class="tab-item">
            <v-icon class="me-2">mdi-cog</v-icon>
            {{ t('settings.system') }}
          </v-tab>
        </v-tabs>

        <v-card-text class="tab-content">
          <v-window v-model="activeTab">
            <!-- Appearance Tab -->
            <v-window-item value="appearance">
              <div class="tab-section">
                <div class="section-header">
                  <h3 class="text-h5 mb-1">{{ t('settings.appearance.title') }}</h3>
                  <p class="text-body-2 text-medium-emphasis">{{ t('settings.appearance.subtitle') }}</p>
                </div>

                <v-row class="mt-6">
                  <v-col cols="12" lg="8">
                    <ThemeSettings />
                  </v-col>
                  <v-col cols="12" lg="4">
                    <AppearancePreview />
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

            <!-- Account Tab -->
            <v-window-item value="account">
              <div class="tab-section">
                <div class="section-header">
                  <h3 class="text-h5 mb-1">{{ t('settings.account.title') }}</h3>
                  <p class="text-body-2 text-medium-emphasis">{{ t('settings.account.subtitle') }}</p>
                </div>

                <AccountSettings />
              </div>
            </v-window-item>

            <!-- Notifications Tab -->
            <v-window-item value="notifications">
              <div class="tab-section">
                <div class="section-header">
                  <h3 class="text-h5 mb-1">{{ t('settings.notifications.title') }}</h3>
                  <p class="text-body-2 text-medium-emphasis">{{ t('settings.notifications.subtitle') }}</p>
                </div>

                <NotificationSettings />
              </div>
            </v-window-item>

            <!-- System Tab -->
            <v-window-item value="system">
              <div class="tab-section">
                <div class="section-header">
                  <h3 class="text-h5 mb-1">{{ t('settings.system.title') }}</h3>
                  <p class="text-body-2 text-medium-emphasis">{{ t('settings.system.subtitle') }}</p>
                </div>

                <SystemSettings />
              </div>
            </v-window-item>
          </v-window>
        </v-card-text>
      </v-card>

      <!-- Save Changes Bar -->
      <v-card class="save-bar" elevation="4" v-if="hasUnsavedChanges">
        <v-card-text class="pa-4">
          <div class="d-flex align-center justify-space-between">
            <div>
              <div class="text-body-1 font-weight-medium">{{ t('settings.unsavedChanges') }}</div>
              <div class="text-body-2 text-medium-emphasis">{{ t('settings.unsavedChangesDesc') }}</div>
            </div>
            <div class="d-flex gap-2">
              <v-btn variant="outlined" @click="discardChanges">
                {{ t('common.discard') }}
              </v-btn>
              <v-btn color="primary" @click="saveAllChanges">
                {{ t('common.saveChanges') }}
              </v-btn>
            </div>
          </div>
        </v-card-text>
      </v-card>
    </div>
  </DashboardContent>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useSettingsStore } from '~/stores/settings'
import ThemeSettings from '~/components/theme/ThemeSettings.vue'
import AppearancePreview from '~/components/settings/AppearancePreview.vue'
import AccountSettings from '~/components/settings/AccountSettings.vue'
import NotificationSettings from '~/components/settings/NotificationSettings.vue'
import SystemSettings from '~/components/settings/SystemSettings.vue'

const { t } = useI18n()
const settingsStore = useSettingsStore()

// Active tab
const activeTab = ref('appearance')

// Unsaved changes tracking
const hasUnsavedChanges = computed(() => {
  return settingsStore.canReset
})

// Export settings
const exportSettings = () => {
  const settings = JSON.stringify(settingsStore.settings, null, 2)
  const blob = new Blob([settings], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'god-panel-settings.json'
  a.click()
  URL.revokeObjectURL(url)
}

// Import settings
const importSettings = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const settings = JSON.parse(e.target?.result as string)
          settingsStore.updateSettings(settings)
        } catch (error) {
          console.error('Invalid settings file:', error)
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

// Save all changes
const saveAllChanges = () => {
  // Settings are auto-saved in the components, just hide the bar
}

// Discard changes
const discardChanges = () => {
  settingsStore.resetSettings()
}

// Page meta
definePageMeta({
  layout: 'dashboard',
  middleware: 'auth'
})

// SEO
useHead({
  title: 'Settings - God Panel'
})
</script>

<style scoped>
.settings-page {
  padding: 24px 0;
  max-width: 1400px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: center;
  margin-bottom: 32px;
  padding: 24px;
  background: linear-gradient(135deg,
    rgb(var(--v-theme-surface)) 0%,
    rgb(var(--v-theme-surface-variant)) 100%);
  border-radius: 16px;
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.2);
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.header-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 16px;
  background: rgba(var(--v-theme-primary), 0.1);
  border: 2px solid rgba(var(--v-theme-primary), 0.2);
}

.header-text h1 {
  margin: 0;
  color: rgb(var(--v-theme-on-surface));
}

.header-actions {
  display: flex;
  gap: 8px;
}

.settings-container {
  margin-top: 24px;
  border-radius: 16px;
  overflow: hidden;
}

.settings-tabs {
  background: rgb(var(--v-theme-surface));
  border-bottom: 1px solid rgba(var(--v-theme-outline-variant), 0.3);
}

.tab-item {
  min-height: 56px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

.tab-content {
  padding: 0;
  min-height: 500px;
}

.tab-section {
  padding: 32px;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h3 {
  color: rgb(var(--v-theme-on-surface));
  font-weight: 600;
}

.save-bar {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  min-width: 600px;
  max-width: 90vw;
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
}

.save-bar .v-card-text {
  background: linear-gradient(135deg,
    rgb(var(--v-theme-primary)) 0%,
    rgb(var(--v-theme-secondary)) 100%);
  color: rgb(var(--v-theme-on-primary));
}

.save-bar .text-body-1,
.save-bar .text-body-2 {
  color: inherit;
}

/* Responsive Design */
@media (max-width: 768px) {
  .settings-page {
    padding: 16px;
  }

  .page-header {
    flex-direction: column;
    text-align: center;
    padding: 20px;
  }

  .header-actions {
    margin-top: 16px;
  }

  .tab-section {
    padding: 20px 16px;
  }

  .save-bar {
    min-width: 90vw;
    bottom: 16px;
  }
}

@media (max-width: 480px) {
  .settings-tabs .v-tab {
    font-size: 12px;
    padding: 0 8px;
  }

  .settings-tabs .v-icon {
    display: none;
  }

  .header-icon {
    width: 48px;
    height: 48px;
  }

  .header-text h1 {
    font-size: 1.5rem;
  }
}
</style>
