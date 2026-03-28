<template>
  <div class="nav-info-box" :class="{ 'mini-mode': mini && !mobile, 'rtl-mode': isRTL }">
    <div class="info-header" v-if="!mini || mobile">
      <AppIcon name="information-outline" :size="16" class="info-icon" />
      <span class="info-title">{{ t("common.help") }}</span>
    </div>

    <div class="info-links">
      <a
        href="https://github.com/god-plans/god-panel-nuxt"
        target="_blank"
        rel="noopener noreferrer"
        class="info-link"
        :title="t('common.github')"
      >
        <AppIcon name="github" :size="18" class="link-icon" />
        <span v-if="!mini || mobile" class="link-text">{{ t("common.github") }}</span>
      </a>

      <a
        href="https://docs.godplans.org/"
        target="_blank"
        rel="noopener noreferrer"
        class="info-link"
        :title="t('common.documentation')"
      >
        <AppIcon name="book-open-page-variant" :size="18" class="link-icon" />
        <span v-if="!mini || mobile" class="link-text">{{ t("common.documentation") }}</span>
      </a>

      <a
        href="https://github.com/god-plans/god-panel-nuxt/issues"
        target="_blank"
        rel="noopener noreferrer"
        class="info-link"
        :title="t('common.support')"
      >
        <AppIcon name="help-circle" :size="18" class="link-icon" />
        <span v-if="!mini || mobile" class="link-text">{{ t("common.support") }}</span>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import { useSettingsStore } from "../../stores/settings";
import AppIcon from "~/components/ui/AppIcon.vue";

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
  border-top: 1px solid var(--gk-color-border);
  background: color-mix(in srgb, var(--gk-color-border) 35%, transparent);
}

.info-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid color-mix(in srgb, var(--gk-color-on-surface) 10%, transparent);
}

.info-icon {
  color: var(--gk-color-primary);
  opacity: 0.8;
}

.info-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
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
  color: var(--gk-color-on-surface);
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
}

.info-link:hover {
  background: color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
  color: var(--gk-color-primary);
  transform: translateX(2px);
}

.link-icon {
  color: var(--gk-color-on-surface-muted);
  transition: color 0.2s ease;
  flex-shrink: 0;
}

.info-link:hover .link-icon {
  color: var(--gk-color-primary);
}

.link-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.nav-info-box.mini-mode {
  padding: 12px 8px;
}

.nav-info-box.mini-mode .info-header {
  justify-content: flex-start;
  margin-bottom: 8px;
}

.nav-info-box.mini-mode .info-links {
  align-items: stretch;
}

.nav-info-box.mini-mode .info-link {
  justify-content: flex-start;
  padding: 8px 10px;
  gap: 0;
}

.nav-info-box.mini-mode .link-text {
  display: none;
}

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
