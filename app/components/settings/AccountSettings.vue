<template>
  <div class="account-settings">
    <v-row>
      <!-- Profile Information -->
      <v-col cols="12" lg="8">
        <v-card class="profile-card" elevation="0">
          <v-card-title class="text-h6 mb-4">
            <v-icon class="me-2">mdi-account-edit</v-icon>
            {{ t('settings.account.profileInfo') }}
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="profile.firstName"
                  :label="t('settings.account.firstName')"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-account"
                  :error-messages="errors.firstName"
                />
              </v-col>
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="profile.lastName"
                  :label="t('settings.account.lastName')"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-account"
                  :error-messages="errors.lastName"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="profile.email"
                  :label="t('settings.account.email')"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-email"
                  type="email"
                  :error-messages="errors.email"
                />
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="profile.phone"
                  :label="t('settings.account.phone')"
                  variant="outlined"
                  density="comfortable"
                  prepend-inner-icon="mdi-phone"
                  :error-messages="errors.phone"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="profile.bio"
                  :label="t('settings.account.bio')"
                  variant="outlined"
                  density="comfortable"
                  :placeholder="t('settings.account.bioPlaceholder')"
                  rows="3"
                  counter="200"
                  :maxlength="200"
                />
              </v-col>
            </v-row>

            <v-divider class="my-6" />

            <!-- Coming Soon Notice -->
            <v-alert
              type="info"
              variant="tonal"
              class="mb-4"
              prepend-icon="mdi-information"
            >
              <strong>{{ t('common.comingSoon') }}:</strong> {{ t('settings.account.profileInfo') }} {{ t('common.comingSoon').toLowerCase() }}
            </v-alert>

            <!-- Account Actions -->
            <div class="account-actions">
              <v-btn
                color="primary"
                @click="saveProfile"
                :loading="saving"
                class="me-3"
                disabled
              >
                <v-icon class="me-2">mdi-content-save</v-icon>
                {{ t('common.save') }}
              </v-btn>
              <v-btn
                variant="outlined"
                @click="resetProfile"
                disabled
              >
                {{ t('common.reset') }}
              </v-btn>
            </div>
          </v-card-text>
        </v-card>

        <!-- Security Settings -->
        <v-card class="security-card mt-6" elevation="0">
          <v-card-title class="text-h6 mb-4">
            <v-icon class="me-2">mdi-shield-lock</v-icon>
            {{ t('settings.account.security') }}
          </v-card-title>

          <v-card-text>
            <v-alert
              type="info"
              variant="tonal"
              class="mb-4"
              prepend-icon="mdi-information"
            >
              <strong>{{ t('common.comingSoon') }}:</strong> {{ t('settings.account.security') }} {{ t('common.comingSoon').toLowerCase() }}
            </v-alert>

            <div class="security-item">
              <div class="security-content">
                <div class="security-title">{{ t('settings.account.changePassword') }}</div>
                <div class="security-description">{{ t('settings.account.changePasswordDesc') }}</div>
              </div>
              <v-btn variant="outlined" size="small" disabled>
                {{ t('settings.account.changePassword') }}
              </v-btn>
            </div>

            <v-divider class="my-4" />

            <div class="security-item">
              <div class="security-content">
                <div class="security-title">{{ t('settings.account.twoFactor') }}</div>
                <div class="security-description">{{ t('settings.account.twoFactorDesc') }}</div>
              </div>
              <v-switch
                v-model="security.twoFactorEnabled"
                color="primary"
                density="compact"
                hide-details
              />
            </div>

            <v-divider class="my-4" />

            <div class="security-item">
              <div class="security-content">
                <div class="security-title">{{ t('settings.account.loginAlerts') }}</div>
                <div class="security-description">{{ t('settings.account.loginAlertsDesc') }}</div>
              </div>
              <v-switch
                v-model="security.loginAlertsEnabled"
                color="primary"
                density="compact"
                hide-details
              />
            </div>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Profile Avatar & Stats -->
      <v-col cols="12" lg="4">
        <!-- Profile Avatar -->
        <v-card class="avatar-card" elevation="0">
          <v-card-text class="text-center">
            <v-avatar size="120" class="mb-4 mx-auto">
              <v-img :src="profile.avatar" :alt="fullName" />
              <v-btn
                icon
                size="small"
                variant="flat"
                class="avatar-edit-btn"
                @click="changeAvatar"
              >
                <v-icon size="16">mdi-camera</v-icon>
              </v-btn>
            </v-avatar>

            <h3 class="text-h6 mb-1">{{ fullName }}</h3>
            <p class="text-body-2 text-medium-emphasis mb-4">{{ profile.email }}</p>

            <v-btn variant="outlined" @click="changeAvatar" block>
              <v-icon class="me-2">mdi-camera</v-icon>
              {{ t('settings.account.changeAvatar') }}
            </v-btn>
          </v-card-text>
        </v-card>

        <!-- Account Stats -->
        <v-card class="stats-card mt-6" elevation="0">
          <v-card-title class="text-h6">
            <v-icon class="me-2">mdi-chart-line</v-icon>
            {{ t('settings.account.stats') }}
          </v-card-title>

          <v-card-text>
            <div class="stat-item">
              <div class="stat-icon">
                <v-icon color="primary">mdi-calendar</v-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ accountStats.memberSince }}</div>
                <div class="stat-label">{{ t('settings.account.memberSince') }}</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <v-icon color="success">mdi-login</v-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ accountStats.lastLogin }}</div>
                <div class="stat-label">{{ t('settings.account.lastLogin') }}</div>
              </div>
            </div>

            <div class="stat-item">
              <div class="stat-icon">
                <v-icon color="warning">mdi-security</v-icon>
              </div>
              <div class="stat-content">
                <div class="stat-value">{{ accountStats.securityScore }}%</div>
                <div class="stat-label">{{ t('settings.account.securityScore') }}</div>
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

// Profile data
const profile = reactive({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  bio: 'UI/UX Designer passionate about creating beautiful and functional user experiences.',
  avatar: 'https://via.placeholder.com/120x120/007867/FFFFFF?text=JD'
})

// Computed
const fullName = computed(() => `${profile.firstName} ${profile.lastName}`)

// Security settings
const security = reactive({
  twoFactorEnabled: false,
  loginAlertsEnabled: true
})

// Account stats
const accountStats = reactive({
  memberSince: 'Jan 2024',
  lastLogin: '2 hours ago',
  securityScore: 85
})

// Form validation
const errors = reactive({
  firstName: [],
  lastName: [],
  email: [],
  phone: []
})

// Loading states
const saving = ref(false)

// Methods
const saveProfile = async () => {
  saving.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Profile saved:', profile)
  } finally {
    saving.value = false
  }
}

const resetProfile = () => {
  // Reset to original values
  console.log('Profile reset')
}

const changeAvatar = () => {
  // Implement avatar change logic
  console.log('Change avatar')
}
</script>

<style scoped>
.account-settings {
  width: 100%;
}

.profile-card,
.security-card,
.avatar-card,
.stats-card {
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.2);
  border-radius: 12px;
}

.account-actions {
  display: flex;
  gap: 12px;
}

.security-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

.security-content {
  flex: 1;
}

.security-title {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 4px;
}

.security-description {
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface-variant));
}

.avatar-edit-btn {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgb(var(--v-theme-primary));
  color: rgb(var(--v-theme-on-primary));
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid rgba(var(--v-theme-outline-variant), 0.1);
}

.stat-item:last-child {
  border-bottom: none;
}

.stat-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(var(--v-theme-surface-variant), 0.5);
}

.stat-content {
  flex: 1;
}

.stat-value {
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  font-size: 14px;
}

.stat-label {
  font-size: 12px;
  color: rgb(var(--v-theme-on-surface-variant));
}

@media (max-width: 768px) {
  .security-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .account-actions {
    flex-direction: column;
  }

  .account-actions .v-btn {
    width: 100%;
  }
}
</style>
