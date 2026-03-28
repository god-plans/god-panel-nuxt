<template>
  <footer
    class="main-footer mt-auto border-t"
    :style="{
      borderColor: 'var(--gk-color-border)',
      background: 'var(--gk-color-surface)',
    }"
  >
    <div class="max-w-7xl mx-auto px-4 py-12">
      <div class="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div class="md:col-span-4 footer-section">
          <Logo variant="compact" size="md" class="footer-logo mb-4" />
          <p class="footer-description text-[var(--gk-color-on-surface-muted)] leading-relaxed">
            {{ t('footer.description') }}
          </p>
        </div>

        <div class="md:col-span-2 footer-section">
          <h4 class="footer-title">{{ t('footer.product') }}</h4>
          <div class="footer-links flex flex-col gap-2">
            <router-link to="/features" class="footer-link">{{ t('footer.features') }}</router-link>
            <router-link to="/pricing" class="footer-link">{{ t('footer.pricing') }}</router-link>
            <router-link to="/docs" class="footer-link">{{ t('footer.documentation') }}</router-link>
            <router-link to="/api" class="footer-link">{{ t('footer.api') }}</router-link>
          </div>
        </div>

        <div class="md:col-span-2 footer-section">
          <h4 class="footer-title">{{ t('footer.company') }}</h4>
          <div class="footer-links flex flex-col gap-2">
            <router-link to="/about" class="footer-link">{{ t('footer.about') }}</router-link>
            <router-link to="/blog" class="footer-link">{{ t('footer.blog') }}</router-link>
            <router-link to="/careers" class="footer-link">{{ t('footer.careers') }}</router-link>
            <router-link to="/contact" class="footer-link">{{ t('footer.contact') }}</router-link>
          </div>
        </div>

        <div class="md:col-span-2 footer-section">
          <h4 class="footer-title">{{ t('footer.support') }}</h4>
          <div class="footer-links flex flex-col gap-2">
            <router-link to="/help" class="footer-link">{{ t('footer.helpCenter') }}</router-link>
            <router-link to="/privacy" class="footer-link">{{ t('footer.privacyPolicy') }}</router-link>
            <router-link to="/terms" class="footer-link">{{ t('footer.termsOfService') }}</router-link>
            <router-link to="/status" class="footer-link">{{ t('footer.status') }}</router-link>
          </div>
        </div>

        <div class="md:col-span-2 footer-section">
          <h4 class="footer-title">{{ t('footer.connect') }}</h4>
          <div class="social-links flex gap-2">
            <GkButton
              v-for="social in socialLinks"
              :key="social.key"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
              slim
              class="social-btn"
            >
              <AppIcon :name="social.icon.replace('mdi-', '')" :size="20" />
            </GkButton>
          </div>
        </div>
      </div>

      <GkDivider class="my-6" />

      <div class="copyright text-center text-sm text-[var(--gk-color-on-surface-muted)]">
        <p>&copy; {{ currentYear }} God Panel. All rights reserved.</p>
        <p>Made with ❤️ by God Plan Team</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { GkButton, GkDivider } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'
import Logo from '~/components/common/Logo.vue'

const { t } = useI18n()

interface SocialLink {
  key: string
  icon: string
  url: string
}

const socialLinks = ref<SocialLink[]>([
  { key: 'github', icon: 'mdi-github', url: 'https://github.com' },
  { key: 'twitter', icon: 'mdi-twitter', url: 'https://twitter.com' },
  { key: 'linkedin', icon: 'mdi-linkedin', url: 'https://linkedin.com' },
  { key: 'discord', icon: 'mdi-discord', url: 'https://discord.com' },
])

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
  margin-bottom: 1rem;
}

.footer-link {
  color: var(--gk-color-on-surface-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: var(--gk-color-primary);
}

@media (max-width: 959px) {
  .footer-section {
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
