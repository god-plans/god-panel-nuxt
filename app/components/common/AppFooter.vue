<template>
  <v-footer
    color="transparent"
    class="main-footer"
  >
    <v-container>
      <v-row>
        <!-- Logo and Description -->
        <v-col cols="12" md="4" class="footer-section">
          <v-img
            src="/logo-full.svg"
            width="120"
            class="footer-logo"
            contain
          />
          <p class="footer-description">
            {{ t('footer.description') }}
          </p>
        </v-col>

        <!-- Quick Links -->
        <v-col cols="12" md="2" class="footer-section">
          <h4 class="footer-title">{{ t('footer.product') }}</h4>
          <div class="footer-links">
            <router-link to="/features" class="footer-link">{{ t('footer.features') }}</router-link>
            <router-link to="/pricing" class="footer-link">{{ t('footer.pricing') }}</router-link>
            <router-link to="/docs" class="footer-link">{{ t('footer.documentation') }}</router-link>
            <router-link to="/api" class="footer-link">{{ t('footer.api') }}</router-link>
          </div>
        </v-col>

        <!-- Company -->
        <v-col cols="12" md="2" class="footer-section">
          <h4 class="footer-title">{{ t('footer.company') }}</h4>
          <div class="footer-links">
            <router-link to="/about" class="footer-link">{{ t('footer.about') }}</router-link>
            <router-link to="/blog" class="footer-link">{{ t('footer.blog') }}</router-link>
            <router-link to="/careers" class="footer-link">{{ t('footer.careers') }}</router-link>
            <router-link to="/contact" class="footer-link">{{ t('footer.contact') }}</router-link>
          </div>
        </v-col>

        <!-- Support -->
        <v-col cols="12" md="2" class="footer-section">
          <h4 class="footer-title">{{ t('footer.support') }}</h4>
          <div class="footer-links">
            <router-link to="/help" class="footer-link">{{ t('footer.helpCenter') }}</router-link>
            <router-link to="/privacy" class="footer-link">{{ t('footer.privacyPolicy') }}</router-link>
            <router-link to="/terms" class="footer-link">{{ t('footer.termsOfService') }}</router-link>
            <router-link to="/status" class="footer-link">{{ t('footer.status') }}</router-link>
          </div>
        </v-col>

        <!-- Social Links -->
        <v-col cols="12" md="2" class="footer-section">
          <h4 class="footer-title">{{ t('footer.connect') }}</h4>
          <div class="social-links">
            <v-btn
              v-for="social in socialLinks"
              :key="social.key"
              :href="social.url"
              target="_blank"
              icon
              variant="text"
              size="small"
              class="social-btn"
            >
              <v-icon>{{ social.icon }}</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- Copyright -->
      <v-divider class="my-4" />
      <div class="copyright">
        <p>&copy; {{ currentYear }} God Panel. All rights reserved.</p>
        <p>Made with ❤️ by God Plan Team</p>
      </div>
    </v-container>
  </v-footer>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
interface SocialLink {
  key: string
  icon: string
  url: string
}

// Social links
const socialLinks = ref<SocialLink[]>([
  {
    key: 'github',
    icon: 'mdi-github',
    url: 'https://github.com'
  },
  {
    key: 'twitter',
    icon: 'mdi-twitter',
    url: 'https://twitter.com'
  },
  {
    key: 'linkedin',
    icon: 'mdi-linkedin',
    url: 'https://linkedin.com'
  },
  {
    key: 'discord',
    icon: 'mdi-discord',
    url: 'https://discord.com'
  }
])

// Current year for copyright
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.main-footer {
  border-top: 1px solid rgb(var(--v-theme-surface-variant));
  background: rgb(var(--v-theme-surface));
  margin-top: auto;
}

.footer-section {
  margin-bottom: 2rem;
}

.footer-logo {
  margin-bottom: 1rem;
}

.footer-description {
  color: rgb(var(--v-theme-on-surface-variant));
  line-height: 1.6;
  margin-bottom: 0;
}

.footer-title {
  font-size: 1.125rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 1rem;
}

.footer-links {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-link {
  color: rgb(var(--v-theme-on-surface-variant));
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-link:hover {
  color: rgb(var(--v-theme-primary));
}

.social-links {
  display: flex;
  gap: 0.5rem;
}

.social-btn {
  color: rgb(var(--v-theme-on-surface-variant));
}

.social-btn:hover {
  color: rgb(var(--v-theme-primary));
}

.copyright {
  text-align: center;
  color: rgb(var(--v-theme-on-surface-variant));
  font-size: 0.875rem;
}

.copyright p {
  margin: 0.25rem 0;
}

/* Responsive */
@media (max-width: 959px) {
  .footer-section {
    text-align: center;
    margin-bottom: 2rem;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
