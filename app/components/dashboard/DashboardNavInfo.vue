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
  padding: 1rem 0.875rem 1.1rem;
  border-top: 1px solid color-mix(in srgb, var(--gk-color-border) 88%, transparent);
  background: linear-gradient(
    180deg,
    color-mix(in srgb, var(--gk-color-border) 18%, transparent),
    color-mix(in srgb, var(--gk-color-primary) 3%, var(--gk-color-surface)) 100%
  );
}

.info-header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  margin-bottom: 0.65rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid color-mix(in srgb, var(--gk-color-on-surface) 8%, transparent);
}

.info-icon {
  color: var(--gk-color-primary);
  opacity: 0.85;
}

.info-title {
  font-size: 0.6875rem;
  font-weight: 600;
  color: var(--gk-color-on-surface-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.info-links {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.info-link {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.5rem 0.65rem;
  border-radius: 10px;
  text-decoration: none;
  color: var(--gk-color-on-surface);
  transition:
    background 0.18s ease,
    color 0.18s ease,
    transform 0.18s ease;
  font-size: 0.8125rem;
  font-weight: 500;
}

.info-link:hover {
  background: color-mix(in srgb, var(--gk-color-primary) 9%, transparent);
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
