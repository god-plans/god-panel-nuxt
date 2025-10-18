<template>
  <div class="auth-layout">
    <!-- Top Header -->
    <div class="auth-header">
      <div class="header-content">
        <div class="help-section">
          <span class="help-text">{{ t('common.needHelp') }}</span>
          <v-btn icon size="small" rounded="lg">
            <v-icon size="20">mdi-help-circle-outline</v-icon>
          </v-btn>
        </div>
        <div class="logo-section">
          <LanguageSwitcher />
          <SettingsButton />
          <v-img
            src="/logo-single.svg"
            width="40"
            height="40"
            class="logo"
          />
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="auth-main">
      <slot />
    </div>

    <!-- Settings Drawer -->
    <SettingsDrawer />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from '~/components/theme/LanguageSwitcher.vue'
import SettingsButton from '~/components/theme/SettingsButton.vue'
import SettingsDrawer from '~/components/settings/drawer/SettingsDrawer.vue'

const { t } = useI18n()
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  background: rgb(var(--v-theme-background-default, #ffffff));
  position: relative;
  overflow: hidden;
  transition: background-color 0.3s ease;
}

.auth-header {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  padding: 16px 24px;
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
}

.help-section {
  display: flex;
  align-items: center;
  gap: 8px;
}

.help-text {
  color: rgb(var(--v-theme-on-background, #212b36));
  font-size: 14px;
  font-weight: 500;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  filter: none;
}

.auth-main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 80px 24px 24px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .auth-header {
    padding: 12px 16px;
  }

  .header-content {
    flex-direction: column;
    gap: 12px;
  }

  .logo-section {
    order: -1;
  }

  .auth-main {
    padding-top: 120px;
  }
}

/* RTL support */
[dir="rtl"] .header-content {
  direction: rtl;
  flex-direction: row-reverse;
}

[dir="rtl"] .help-section {
  margin-left: auto;
  margin-right: 0;
}

[dir="rtl"] .logo-section {
  margin-right: auto;
  margin-left: 0;
}
</style>
