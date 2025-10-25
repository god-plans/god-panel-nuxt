<template>
  <div class="min-h-screen">
    <div class="hidden md:fixed md:top-0 md:left-0 md:z-10 md:p-4 md:flex items-center gap-4">
      <Logo size="sm" />
    </div>
    <!-- Top Header -->
    <div class="fixed top-0 right-0 z-10 p-4 md:p-6">
      <div class="flex items-center justify-between gap-3">
        <!-- Settings Button -->
        <SettingsButton />
        <!-- Language Switcher -->
        <LanguageSwitcher />
      </div>
    </div>

    <!-- Main Content -->
    <AuthMain>
      <AuthSection
        :title="t('auth.welcomeTitle')"
        :subtitle="t('auth.welcomeSubtitle')"
        img-url="/assets/images/login.webp"
      />
      <AuthContent>
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

