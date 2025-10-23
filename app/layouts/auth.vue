<template>
  <div class="auth-layout">
    <div class="logo-section">
      <Logo size="sm" class="logo" />
    </div>
    <!-- Top Header -->
    <div class="auth-header">
      <div class="header-content">
        <!-- Settings Button -->
        <SettingsButton />
        <!-- Language Switcher -->
        <LanguageSwitcher />
      </div>
    </div>

    <!-- Main Content -->
    <AuthMain layout-query="md">
      <AuthSection
        :title="t('auth.welcomeTitle')"
        :subtitle="t('auth.welcomeSubtitle')"
        img-url="/assets/images/login.webp"
        layout-query="md"
      />
      <AuthContent layout-query="md">
        <slot />
      </AuthContent>
    </AuthMain>

    <!-- Settings Drawer -->
    <!-- <SettingsDrawer /> -->
  </div>
</template>

<script setup lang="ts">
// import SettingsDrawer from '~/components/settings/drawer/SettingsDrawer.vue'
import AuthMain from "~/components/auth/Main.vue";
import AuthSection from "~/components/auth/Section.vue";
import AuthContent from "~/components/auth/Content.vue";
import SettingsButton from "~/components/theme/SettingsButton.vue";
import LanguageSwitcher from "~/components/theme/LanguageSwitcher.vue";
import Logo from "~/components/common/Logo.vue";

import { useI18n } from "vue-i18n";

const { t } = useI18n();
</script>

<style scoped>
.auth-header {
  position: fixed;
  top: 0;

  right: 0;
  z-index: 10;
  padding: 16px 24px;
}

.logo-section {
  @media (min-width: 960px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    padding: 16px 24px;
    display: flex;
    align-items: center;
    gap: 16px;
  }
  @media (max-width: 959px) {
   
  }
}

.logo {
  filter: none;
}

/* CSS Variables for layout */
.auth-layout {
  --layout-header-desktop-height: 64px;
  --layout-auth-content-width: 420px;
}
.header-content {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
/* Responsive adjustments */
@media (max-width: 959px) {
  .auth-header {
    padding: 12px 16px;
  }

  .logo-section {
    order: -1;
  }
}

/* RTL support */
[dir="rtl"] .header-content {
  direction: rtl;
  display: flex;
  justify-content: flex-end;
  align-items: center;
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
