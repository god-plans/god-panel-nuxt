<template>
  <div class="nav-info-box" :class="{ 'mini-mode': mini && !mobile, 'rtl-mode': isRTL }">
    <div class="info-header" v-if="!mini || mobile">
      <v-icon size="16" class="info-icon">mdi-information-outline</v-icon>
      <span class="info-title">{{ t("common.help") }}</span>
    </div>

    <div class="info-links">
      <!-- GitHub Link -->
      <a
        href="https://github.com/god-plans/god-panel-nuxt"
        target="_blank"
        rel="noopener noreferrer"
        class="info-link"
        :title="t('common.github')"
      >
        <v-icon size="18" class="link-icon">mdi-github</v-icon>
        <span v-if="!mini || mobile" class="link-text">{{ t("common.github") }}</span>
      </a>

      <!-- Documentation Link -->
      <a
        href="https://docs.godplans.org/"
        target="_blank"
        rel="noopener noreferrer"
        class="info-link"
        :title="t('common.documentation')"
      >
        <v-icon size="18" class="link-icon">mdi-book-open-page-variant</v-icon>
        <span v-if="!mini || mobile" class="link-text">{{ t("common.documentation") }}</span>
      </a>

      <!-- Support/Issues Link -->
      <a
        href="https://github.com/god-plans/god-panel-nuxt/issues"
        target="_blank"
        rel="noopener noreferrer"
        class="info-link"
        :title="t('common.support')"
      >
        <v-icon size="18" class="link-icon">mdi-help-circle</v-icon>
        <span v-if="!mini || mobile" class="link-text">{{ t("common.support") }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useSettingsStore } from "../../stores/settings";

const { t } = useI18n();
const settingsStore = useSettingsStore();

const isRTL = computed(() => settingsStore.settings.direction === "rtl");

defineProps<{
  mini?: boolean;
  mobile?: boolean;
}>();
</script>

<style scoped>
.nav-info-box {
  padding: 16px;
  border-top: 1px solid rgb(var(--v-theme-surface-variant));
  background: rgba(var(--v-theme-surface-variant-rgb), 0.5);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface-rgb), 0.1);
}

.info-icon {
  color: rgb(var(--v-theme-primary));
  opacity: 0.8;
}

.info-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-link {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  text-decoration: none;
  color: rgb(var(--v-theme-on-surface));
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.info-link:hover {
  background: rgba(var(--v-theme-on-surface-rgb), 0.08);
  color: rgb(var(--v-theme-primary));
  transform: translateX(2px);
}

.link-icon {
  color: rgb(var(--v-theme-on-surface-variant));
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.info-link:hover .link-icon {
  color: rgb(var(--v-theme-primary));
}

.link-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Mini mode */
.nav-info-box.mini-mode {
  padding: 12px 8px;
}

.nav-info-box.mini-mode .info-header {
  justify-content: center;
  margin-bottom: 8px;
}

.nav-info-box.mini-mode .info-links {
  align-items: center;
}

.nav-info-box.mini-mode .info-link {
  justify-content: center;
  padding: 8px;
  gap: 0;
}

.nav-info-box.mini-mode .link-text {
  display: none;
}

/* RTL Support */
.rtl-mode .info-link:hover {
  transform: translateX(-2px);
}

.rtl-mode .nav-info-box.mini-mode .info-link {
  direction: ltr;
}

[dir="rtl"] .info-link:hover {
  transform: translateX(-2px);
}

[dir="rtl"] .nav-info-box.mini-mode .info-link {
  direction: ltr;
}

/* Mobile adjustments */
@media (max-width: 959px) {
  .nav-info-box {
    padding: 12px;
  }

  .info-links {
    gap: 2px;
  }

  .info-link {
    padding: 10px 12px;
  }
}
</style>
