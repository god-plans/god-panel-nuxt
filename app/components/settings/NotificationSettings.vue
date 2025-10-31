<template>
  <div class="notification-settings">
    <v-alert
      type="info"
      variant="tonal"
      class="mb-6"
      prepend-icon="mdi-information"
    >
      <strong>{{ t('common.comingSoon') }}:</strong> {{ t('settings.notifications.title') }} {{ t('common.comingSoon').toLowerCase() }}
    </v-alert>

    <v-row>
      <!-- Notification Preferences -->
      <v-col cols="12" lg="8">
        <!-- Email Notifications -->
        <v-card class="notification-card" elevation="0">
          <v-card-title class="text-h6 mb-4">
            <v-icon class="me-2">mdi-email</v-icon>
            {{ t('settings.notifications.email.title') }}
          </v-card-title>

          <v-card-text>
            <div class="notification-group">
              <div class="group-header">
                <h4 class="text-body-1 font-weight-medium">{{ t('settings.notifications.email.account') }}</h4>
                <p class="text-body-2 text-medium-emphasis">{{ t('settings.notifications.email.accountDesc') }}</p>
              </div>

              <div class="notification-items">
                <div class="notification-item">
                  <div class="notification-content">
                    <div class="notification-title">{{ t('settings.notifications.email.securityAlerts') }}</div>
                    <div class="notification-description">{{ t('settings.notifications.email.securityAlertsDesc') }}</div>
                  </div>
                  <v-switch
                    v-model="notifications.email.securityAlerts"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </div>

                <div class="notification-item">
                  <div class="notification-content">
                    <div class="notification-title">{{ t('settings.notifications.email.passwordChanges') }}</div>
                    <div class="notification-description">{{ t('settings.notifications.email.passwordChangesDesc') }}</div>
                  </div>
                  <v-switch
                    v-model="notifications.email.passwordChanges"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </div>

                <div class="notification-item">
                  <div class="notification-content">
                    <div class="notification-title">{{ t('settings.notifications.email.accountUpdates') }}</div>
                    <div class="notification-description">{{ t('settings.notifications.email.accountUpdatesDesc') }}</div>
                  </div>
                  <v-switch
                    v-model="notifications.email.accountUpdates"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </div>
              </div>
            </div>

            <v-divider class="my-6" />

            <div class="notification-group">
              <div class="group-header">
                <h4 class="text-body-1 font-weight-medium">{{ t('settings.notifications.email.system') }}</h4>
                <p class="text-body-2 text-medium-emphasis">{{ t('settings.notifications.email.systemDesc') }}</p>
              </div>

              <div class="notification-items">
                <div class="notification-item">
                  <div class="notification-content">
                    <div class="notification-title">{{ t('settings.notifications.email.systemUpdates') }}</div>
                    <div class="notification-description">{{ t('settings.notifications.email.systemUpdatesDesc') }}</div>
                  </div>
                  <v-switch
                    v-model="notifications.email.systemUpdates"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </div>

                <div class="notification-item">
                  <div class="notification-content">
                    <div class="notification-title">{{ t('settings.notifications.email.maintenance') }}</div>
                    <div class="notification-description">{{ t('settings.notifications.email.maintenanceDesc') }}</div>
                  </div>
                  <v-switch
                    v-model="notifications.email.maintenance"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </div>

                <div class="notification-item">
                  <div class="notification-content">
                    <div class="notification-title">{{ t('settings.notifications.email.newsletter') }}</div>
                    <div class="notification-description">{{ t('settings.notifications.email.newsletterDesc') }}</div>
                  </div>
                  <v-switch
                    v-model="notifications.email.newsletter"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>

        <!-- Push Notifications -->
        <v-card class="notification-card mt-6" elevation="0">
          <v-card-title class="text-h6 mb-4">
            <v-icon class="me-2">mdi-bell</v-icon>
            {{ t('settings.notifications.push.title') }}
          </v-card-title>

          <v-card-text>
            <div class="notification-group">
              <div class="group-header">
                <h4 class="text-body-1 font-weight-medium">{{ t('settings.notifications.push.activity') }}</h4>
                <p class="text-body-2 text-medium-emphasis">{{ t('settings.notifications.push.activityDesc') }}</p>
              </div>

              <div class="notification-items">
                <div class="notification-item">
                  <div class="notification-content">
                    <div class="notification-title">{{ t('settings.notifications.push.newMessages') }}</div>
                    <div class="notification-description">{{ t('settings.notifications.push.newMessagesDesc') }}</div>
                  </div>
                  <v-switch
                    v-model="notifications.push.newMessages"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </div>

                <div class="notification-item">
                  <div class="notification-content">
                    <div class="notification-title">{{ t('settings.notifications.push.mentions') }}</div>
                    <div class="notification-description">{{ t('settings.notifications.push.mentionsDesc') }}</div>
                  </div>
                  <v-switch
                    v-model="notifications.push.mentions"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </div>

                <div class="notification-item">
                  <div class="notification-content">
                    <div class="notification-title">{{ t('settings.notifications.push.taskUpdates') }}</div>
                    <div class="notification-description">{{ t('settings.notifications.push.taskUpdatesDesc') }}</div>
                  </div>
                  <v-switch
                    v-model="notifications.push.taskUpdates"
                    color="primary"
                    density="compact"
                    hide-details
                  />
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Notification Summary & Actions -->
      <v-col cols="12" lg="4">
        <!-- Notification Summary -->
        <v-card class="summary-card" elevation="0">
          <v-card-title class="text-h6">
            <v-icon class="me-2">mdi-chart-pie</v-icon>
            {{ t('settings.notifications.summary') }}
          </v-card-title>

          <v-card-text>
            <div class="summary-stats">
              <div class="stat-circle">
                <div class="stat-number">{{ activeNotifications }}</div>
                <div class="stat-label">{{ t('settings.notifications.active') }}</div>
              </div>

              <div class="stat-circle">
                <div class="stat-number">{{ totalNotifications }}</div>
                <div class="stat-label">{{ t('settings.notifications.total') }}</div>
              </div>
            </div>

            <v-progress-linear
              :value="notificationPercentage"
              color="primary"
              height="8"
              rounded
              class="mt-4"
            />

            <p class="text-body-2 text-medium-emphasis mt-2">
              {{ notificationPercentage }}% {{ t('settings.notifications.enabled') }}
            </p>
          </v-card-text>
        </v-card>

        <!-- Quick Actions -->
        <v-card class="actions-card mt-6" elevation="0">
          <v-card-title class="text-h6">
            <v-icon class="me-2">mdi-flash</v-icon>
            {{ t('settings.notifications.quickActions') }}
          </v-card-title>

          <v-card-text>
            <div class="quick-actions">
              <v-btn
                variant="outlined"
                block
                class="mb-3"
                @click="enableAll"
              >
                <v-icon class="me-2">mdi-check-all</v-icon>
                {{ t('settings.notifications.enableAll') }}
              </v-btn>

              <v-btn
                variant="outlined"
                block
                class="mb-3"
                @click="disableAll"
              >
                <v-icon class="me-2">mdi-close</v-icon>
                {{ t('settings.notifications.disableAll') }}
              </v-btn>

              <v-btn
                variant="outlined"
                block
                @click="resetToDefaults"
              >
                <v-icon class="me-2">mdi-refresh</v-icon>
                {{ t('settings.notifications.resetDefaults') }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Notification Channels -->
        <v-card class="channels-card mt-6" elevation="0">
          <v-card-title class="text-h6">
            <v-icon class="me-2">mdi-message</v-icon>
            {{ t('settings.notifications.channels') }}
          </v-card-title>

          <v-card-text>
            <div class="channel-item">
              <div class="channel-icon">
                <v-icon color="primary">mdi-email</v-icon>
              </div>
              <div class="channel-content">
                <div class="channel-name">{{ t('settings.notifications.email.title') }}</div>
                <div class="channel-status">
                  <v-chip
                    :color="emailEnabled ? 'success' : 'grey'"
                    size="small"
                    variant="flat"
                  >
                    {{ emailEnabled ? t('common.enabled') : t('common.disabled') }}
                  </v-chip>
                </div>
              </div>
            </div>

            <div class="channel-item">
              <div class="channel-icon">
                <v-icon color="secondary">mdi-bell</v-icon>
              </div>
              <div class="channel-content">
                <div class="channel-name">{{ t('settings.notifications.push.title') }}</div>
                <div class="channel-status">
                  <v-chip
                    :color="pushEnabled ? 'success' : 'grey'"
                    size="small"
                    variant="flat"
                  >
                    {{ pushEnabled ? t('common.enabled') : t('common.disabled') }}
                  </v-chip>
                </div>
              </div>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useI18n } from 'vue-i18n'

// Composables
const { t } = useI18n()

// Notification settings
const notifications = reactive({
  email: {
    securityAlerts: true,
    passwordChanges: true,
    accountUpdates: true,
    systemUpdates: false,
    maintenance: true,
    newsletter: false
  },
  push: {
    newMessages: true,
    mentions: true,
    taskUpdates: true
  }
})

// Computed properties
const activeNotifications = computed(() => {
  const emailCount = Object.values(notifications.email).filter(Boolean).length
  const pushCount = Object.values(notifications.push).filter(Boolean).length
  return emailCount + pushCount
})

const totalNotifications = computed(() => {
  return Object.keys(notifications.email).length + Object.keys(notifications.push).length
})

const notificationPercentage = computed(() => {
  return Math.round((activeNotifications.value / totalNotifications.value) * 100)
})

const emailEnabled = computed(() => {
  return Object.values(notifications.email).some(Boolean)
})

const pushEnabled = computed(() => {
  return Object.values(notifications.push).some(Boolean)
})

// Methods
const enableAll = () => {
  Object.keys(notifications.email).forEach(key => {
    notifications.email[key] = true
  })
  Object.keys(notifications.push).forEach(key => {
    notifications.push[key] = true
  })
}

const disableAll = () => {
  Object.keys(notifications.email).forEach(key => {
    notifications.email[key] = false
  })
  Object.keys(notifications.push).forEach(key => {
    notifications.push[key] = false
  })
}

const resetToDefaults = () => {
  // Reset to default notification settings
  Object.assign(notifications, {
    email: {
      securityAlerts: true,
      passwordChanges: true,
      accountUpdates: true,
      systemUpdates: false,
      maintenance: true,
      newsletter: false
    },
    push: {
      newMessages: true,
      mentions: true,
      taskUpdates: true
    }
  })
}
</script>

<style scoped>
.notification-settings {
  width: 100%;
}

.notification-card,
.summary-card,
.actions-card,
.channels-card {
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.2);
  border-radius: 12px;
}

.notification-group {
  margin-bottom: 24px;
}

.group-header {
  margin-bottom: 16px;
}

.notification-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.notification-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.1);
  border-radius: 8px;
  background: rgba(var(--v-theme-surface-variant), 0.02);
}

.notification-content {
  flex: 1;
}

.notification-title {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 4px;
}

.notification-description {
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.4;
}

.summary-stats {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 16px;
}

.stat-circle {
  text-align: center;
}

.stat-number {
  font-size: 32px;
  font-weight: 700;
  color: rgb(var(--v-theme-primary));
  line-height: 1;
}

.stat-label {
  font-size: 12px;
  color: rgb(var(--v-theme-on-surface-variant));
  margin-top: 4px;
}

.quick-actions .v-btn {
  justify-content: flex-start;
}

.channel-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(var(--v-theme-outline-variant), 0.1);
}

.channel-item:last-child {
  border-bottom: none;
}

.channel-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(var(--v-theme-surface-variant), 0.5);
}

.channel-content {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.channel-name {
  font-weight: 500;
  color: rgb(var(--v-theme-on-surface));
}

@media (max-width: 768px) {
  .notification-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .summary-stats {
    flex-direction: column;
    gap: 16px;
  }

  .channel-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>

