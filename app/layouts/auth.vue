<template>
  <div class="auth-layout">
    <!-- Top Header -->
    <div class="auth-header">
      <div class="header-content">
        <!-- Settings Button -->
        <SettingsButton />

        <!-- Language Switcher -->
        <LanguageSwitcher />
      </div>
    </div>
    <div class="logo-section">
      <v-img src="/logo-single.svg" width="40" height="40" class="logo" />
    </div>

    <!-- Main Content -->
    <AuthMain layout-query="md">
      <AuthSection
        title="Manage the job"
        subtitle="More effectively with optimized workflows."
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
  display: flex;
  align-items: center;
  gap: 16px;
}

.logo {
  filter: none;
}

/* CSS Variables for layout */
.auth-layout {
  --layout-header-desktop-height: 64px;
  --layout-auth-content-width: 420px;
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
