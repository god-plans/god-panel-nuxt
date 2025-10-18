<template>
  <div class="login-page">
      <!-- Left Panel -->
      <div class="left-panel">
        <div class="background-blur">
          <v-img
            src="/assets/background/background-3-blur.webp"
            class="background-image"
            cover
          />
        </div>
        <div class="welcome-content">
          <div class="welcome-text">
            <h1 class="welcome-title">{{ t('auth.welcomeBack') }}</h1>
            <p class="welcome-subtitle">{{ t('auth.signInToAccount') }}</p>
          </div>
          <div class="illustration">
            <v-img
              src="https://placehold.co/432x324"
              width="384"
              height="288"
              class="illustration-image"
            />
          </div>
        </div>
      </div>

      <!-- Right Panel -->
      <div class="right-panel">
        <div class="login-form-container">
          <!-- Form Header -->
          <div class="form-header">
            <h2 class="form-title">{{ t('auth.signInToAccount') }}</h2>
            <div class="register-link">
              <span class="register-text">{{ t('auth.dontHaveAccount') }}</span>
              <NuxtLink to="/auth/register" class="register-link-text">
                {{ t('auth.signUp') }}
              </NuxtLink>
            </div>
          </div>

          <!-- Info Alert -->
          <v-alert
            type="info"
            variant="tonal"
            density="comfortable"
            class="info-alert"
          >
{{ t('auth.demoCredentials') }} <strong>{{ form.email }}</strong> {{ t('auth.demoCredentialsWith') }} <strong>{{ form.password }}</strong>
          </v-alert>

          <!-- Login Form -->
          <div class="login-form">
            <form @submit.prevent="handleSubmit">
              <!-- Email Field -->
              <v-text-field
                v-model="form.email"
                :label="t('common.email')"
                placeholder="godpanel"
                variant="outlined"
                density="comfortable"
              />

              <!-- Password Field -->
              <div class="password-section">
                <v-text-field
                  v-model="form.password"
                  :label="t('common.password')"
                  placeholder="6+ characters"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                />
                <div class="forgot-password-link">
                  <NuxtLink to="/auth/forgot-password" class="forgot-link">
                    {{ t('auth.forgotPassword') }}
                  </NuxtLink>
                </div>
              </div>

              <!-- Sign In Button -->
              <v-btn
                type="submit"
                size="large"
                block
                color="primary"
                :loading="loading"
              >
                {{ t('auth.signIn') }}
              </v-btn>

              <!-- Demo Login Button (Development Only) -->
              <v-btn
                v-if="isDev"
                variant="outlined"
                size="large"
                block
                color="secondary"
                @click="demoLogin"
                class="mt-2"
              >
                {{ t('auth.signIn') }} Demo
              </v-btn>

              <!-- Divider -->
              <div class="divider-section">
                <div class="divider-line"></div>
                <span class="divider-text">OR</span>
                <div class="divider-line"></div>
              </div>

              <!-- Social Login -->
              <div class="social-login">
                <v-btn
                  icon
                  size="small"
                  variant="outlined"
                  @click="loginWithGoogle"
                >
                  <div class="google-icon">
                    <div class="google-colors">
                      <div class="google-blue"></div>
                      <div class="google-red"></div>
                      <div class="google-yellow"></div>
                      <div class="google-green"></div>
                    </div>
                  </div>
                </v-btn>
                <v-btn
                  icon
                  size="small"
                  variant="outlined"
                  @click="loginWithGithub"
                >
                  <v-icon size="20" color="currentColor">mdi-github</v-icon>
                </v-btn>
                <v-btn
                  icon
                  size="small"
                  variant="outlined"
                  @click="loginWithTwitter"
                >
                  <div class="twitter-icon">
                    <v-icon size="16" color="currentColor">mdi-twitter</v-icon>
                  </div>
                </v-btn>
              </div>
            </form>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { loginSchema, type LoginForm } from '~/types/validation'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

// Check if we're in development mode
const isDev = ref(import.meta.env.DEV)

// Form state
const form = reactive<LoginForm>({
  email: 'godpanel',
  password: 'god123'
})

const errors = ref<Record<string, string[]>>({})
const loading = ref(false)

// Form validation
const validateForm = () => {
  try {
    loginSchema.parse(form)
    errors.value = {}
    return true
  } catch (error: any) {
    errors.value = error.flatten().fieldErrors
    return false
  }
}

// Submit handler
const handleSubmit = async () => {
  if (!validateForm()) return

  loading.value = true
  try {
    const result = await authStore.login(form)

    if (result?.success) {
      await router.push('/dashboard')
    } else {
      // Handle error - you might want to show a snackbar
      console.error('Login failed:', result?.error)
    }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

// Demo login handler
const demoLogin = async () => {
  loading.value = true
  try {
    authStore.demoLogin()
    await router.push('/dashboard')
  } catch (error) {
    console.error('Demo login error:', error)
  } finally {
    loading.value = false
  }
}

// Social login handlers
const loginWithGoogle = () => {
  // Implement Google OAuth login
  console.log('Login with Google')
}

const loginWithGithub = () => {
  // Implement GitHub OAuth login
  console.log('Login with GitHub')
}

const loginWithTwitter = () => {
  // Implement Twitter OAuth login
  console.log('Login with Twitter')
}

// Page meta
definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

// SEO
useHead({
  title: 'Login - God Panel'
})

// Redirect if already authenticated
onMounted(() => {
  if (authStore.isAuthenticated) {
    router.push('/dashboard')
  }
})
</script>

<style scoped>
.login-page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: transparent;
  display: flex;
  flex-direction: row;
  overflow: hidden;
}

/* Left Panel */
.left-panel {
  width: 50%;
  min-height: 100vh;
  position: relative;
  background: linear-gradient(135deg, rgb(var(--v-theme-primary, #1976d2)) 0%, rgb(var(--v-theme-secondary, #424242)) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.background-blur {
  width: 1440px;
  height: 1080px;
  position: absolute;
  left: -480px;
  top: -28px;
  opacity: 0.1;
  overflow: hidden;
}

.background-image {
  width: 1440px;
  height: 1080px;
  filter: blur(8px);
}

.welcome-content {
  width: 100%;
  max-width: 400px;
  padding: 0 32px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 32px;
  text-align: center;
  animation: fadeInUp 0.8s ease-out;
}

.welcome-text {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}

.welcome-title {
  width: 100%;
  text-align: center;
  color: #ffffff;
  font-size: 36px;
  font-weight: 800;
  font-family: 'Barlow', sans-serif;
  line-height: 44px;
  margin: 0;
  letter-spacing: -0.02em;
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  animation: slideInLeft 0.6s ease-out 0.2s both;
}

.welcome-subtitle {
  width: 100%;
  text-align: center;
  color: rgba(255, 255, 255, 0.9);
  font-size: 18px;
  font-weight: 500;
  font-family: 'Public Sans', sans-serif;
  line-height: 28px;
  margin: 0;
  animation: slideInRight 0.6s ease-out 0.4s both;
}

.illustration {
  width: 384px;
  height: 288px;
  position: relative;
}

.illustration-image {
  width: 384px;
  height: 288px;
}

/* Right Panel */
.right-panel {
  width: 50%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px;
  position: relative;
  background: rgb(var(--v-theme-background-default, #ffffff));
}

.login-form-container {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.1);
  border-radius: 24px;
  padding: 48px 40px;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.08),
    0 2px 8px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
}

/* Add a subtle gradient overlay */
.login-form-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-secondary)));
  border-radius: 24px 24px 0 0;
}

/* Form Header */
.form-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  overflow: hidden;
  margin-bottom: 8px;
  position: relative;
}

.form-title {
  width: 100%;
  text-align: center;
  color: rgb(var(--v-theme-text-primary, #212b36));
  font-size: 24px;
  font-weight: 700;
  font-family: 'Public Sans', sans-serif;
  line-height: 32px;
  margin: 0;
  letter-spacing: -0.025em;
}

.register-link {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 4px;
}

.register-text {
  color: rgb(var(--v-theme-text-secondary, #637381));
  font-size: 14px;
  font-weight: 400;
  font-family: 'Public Sans', sans-serif;
  line-height: 22px;
}

.register-link-text {
  color: rgb(var(--v-theme-primary, #1976d2));
  font-size: 14px;
  font-weight: 600;
  font-family: 'Public Sans', sans-serif;
  line-height: 22px;
  text-decoration: none;
}

/* Info Alert */
.info-alert {
  margin-bottom: 16px;
  border-radius: 12px;
  border: 1px solid rgba(var(--v-theme-info), 0.2);
  background: rgba(var(--v-theme-info), 0.08);
  backdrop-filter: blur(8px);
}

/* Login Form */
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

/* Form inputs styling */
.login-form :deep(.v-text-field) {
  border-radius: 12px;
}

.login-form :deep(.v-text-field .v-field) {
  border-radius: 12px;
  background: rgba(var(--v-theme-surface-variant), 0.3);
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.2);
  transition: all 0.2s ease;
}

.login-form :deep(.v-text-field .v-field:hover) {
  background: rgba(var(--v-theme-surface-variant), 0.4);
  border-color: rgba(var(--v-theme-primary), 0.3);
}

.login-form :deep(.v-text-field .v-field:focus-within) {
  background: rgba(var(--v-theme-surface), 0.8);
  border-color: rgb(var(--v-theme-primary));
  box-shadow: 0 0 0 3px rgba(var(--v-theme-primary), 0.1);
}

/* Button Styling */
.login-form :deep(.v-btn) {
  border-radius: 12px;
  font-weight: 600;
  font-size: 15px;
  letter-spacing: 0.025em;
  text-transform: none;
  height: 48px;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

.login-form :deep(.v-btn:not(.v-btn--variant-outlined)) {
  background: linear-gradient(135deg, rgb(var(--v-theme-primary)), rgb(var(--v-theme-primary)) 80%, rgba(var(--v-theme-primary), 0.8));
  box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
}

.login-form :deep(.v-btn:not(.v-btn--variant-outlined):hover) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(var(--v-theme-primary), 0.4);
}

.login-form :deep(.v-btn.v-btn--variant-outlined) {
  border: 2px solid rgba(var(--v-theme-outline), 0.5);
  background: rgba(var(--v-theme-surface), 0.6);
  backdrop-filter: blur(8px);
}

.login-form :deep(.v-btn.v-btn--variant-outlined:hover) {
  border-color: rgb(var(--v-theme-primary));
  background: rgba(var(--v-theme-primary), 0.05);
  transform: translateY(-1px);
}

/* Social Login Buttons */
.social-login :deep(.v-btn) {
  border-radius: 12px;
  width: 48px;
  height: 48px;
  min-width: 48px;
  background: rgba(var(--v-theme-surface), 0.8);
  border: 1px solid rgba(var(--v-theme-outline-variant), 0.3);
  backdrop-filter: blur(8px);
  transition: all 0.2s ease;
}

.social-login :deep(.v-btn:hover) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  background: rgba(var(--v-theme-surface), 0.95);
}

/* Password Section */
.password-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.forgot-password-link {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.forgot-link {
  color: rgb(var(--v-theme-text-primary, #212b36));
  font-size: 14px;
  font-weight: 400;
  font-family: 'Public Sans', sans-serif;
  line-height: 22px;
  text-decoration: none;
}


/* Divider */
.divider-section {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  gap: 16px;
}

.divider-line {
  flex: 1;
  height: 1px;
  border: 1px dashed rgba(145, 158, 171, 0.2);
}

.divider-text {
  color: rgb(var(--v-theme-text-disabled, #919eab));
  font-size: 12px;
  font-weight: 700;
  font-family: 'Public Sans', sans-serif;
  line-height: 18px;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Social Login */
.social-login {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}


/* Google Icon */
.google-icon {
  width: 20px;
  height: 20px;
  position: relative;
}

.google-colors {
  width: 20px;
  height: 20px;
  position: relative;
}

.google-blue {
  width: 16px;
  height: 16px;
  position: absolute;
  left: 1.67px;
  top: 1.67px;
  background-color: #4285f4;
  border-radius: 2px;
}

.google-red {
  width: 14px;
  height: 7px;
  position: absolute;
  left: 2.63px;
  top: 1.67px;
  background-color: #ea4335;
  border-radius: 1px;
}

.google-yellow {
  width: 14px;
  height: 7px;
  position: absolute;
  left: 2.58px;
  top: 11.69px;
  background-color: #fbbc05;
  border-radius: 1px;
}

.google-green {
  width: 8px;
  height: 8px;
  position: absolute;
  left: 10px;
  top: 8.33px;
  background-color: #34a853;
  border-radius: 1px;
}

/* Twitter Icon */
.twitter-icon {
  width: 16px;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* RTL Support */
[dir="rtl"] {
  direction: rtl;
}

[dir="rtl"] .welcome-title,
[dir="rtl"] .welcome-subtitle,
[dir="rtl"] .form-title,
[dir="rtl"] .register-text,
[dir="rtl"] .register-link-text,
[dir="rtl"] .forgot-link,
[dir="rtl"] .divider-text,
[dir="rtl"] .help-text {
  text-align: right;
}

[dir="rtl"] .register-link {
  justify-content: flex-end;
}

/* Mobile Styles */
@media (max-width: 768px) {
  .login-page {
    flex-direction: column;
  }

  .left-panel {
    width: 100%;
    min-height: 40vh;
    background: linear-gradient(135deg, rgb(var(--v-theme-primary, #1976d2)) 0%, rgb(var(--v-theme-secondary, #424242)) 100%);
  }

  .right-panel {
    width: 100%;
    padding: 20px;
    min-height: 60vh;
  }

  .welcome-content {
    padding: 20px;
    max-width: 100%;
  }

  .welcome-title {
    font-size: 28px;
    line-height: 36px;
  }

  .welcome-subtitle {
    font-size: 16px;
    line-height: 24px;
  }

  .illustration {
    width: 280px;
    height: 210px;
  }

  .illustration-image {
    width: 280px;
    height: 210px;
  }

  .form-title {
    font-size: 18px;
    line-height: 28px;
  }

  .login-form-container {
    max-width: 100%;
    gap: 32px;
  }

  .illustration {
    width: 320px;
    height: 240px;
  }

  .illustration-image {
    width: 320px;
    height: 240px;
  }
}

/* Very Small Mobile */
@media (max-width: 480px) {

  .right-panel {
    padding: 16px;
    min-height: 100vh;
  }

  .login-form-container {
    padding: 16px 0;
  }

  .welcome-content {
    position: static;
    padding: 16px;
    gap: 32px;
  }

  .welcome-title {
    font-size: 28px;
    line-height: 36px;
  }

  .illustration {
    width: 280px;
    height: 210px;
  }

  .illustration-image {
    width: 280px;
    height: 280px;
  }
}

/* Keyframe Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

/* Form entrance animation - already defined above */

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
