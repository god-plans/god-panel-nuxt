<template>
  <div class="login-page">
    <!-- Top Header -->
    <div class="top-header">
      <div class="header-content">
        <div class="help-section">
          <span class="help-text">Need help?</span>
          <v-btn icon size="small" rounded="lg">
            <v-icon size="20">mdi-help-circle-outline</v-icon>
          </v-btn>
        </div>
        <div class="logo-section">
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
    <div class="main-content">
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
            <h1 class="welcome-title">Hi, Welcome back</h1>
            <p class="welcome-subtitle">More effectively with optimized workflows.</p>
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
            <h2 class="form-title">Sign in to your account</h2>
            <div class="register-link">
              <span class="register-text">Don't have an account?</span>
              <NuxtLink to="/auth/register" class="register-link-text">
                Get started
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
            Use <strong>{{ form.email }}</strong> with password <strong>@demo1</strong>
          </v-alert>

          <!-- Login Form -->
          <div class="login-form">
            <form @submit.prevent="handleSubmit">
              <!-- Email Field -->
              <v-text-field
                v-model="form.email"
                label="Email address"
                placeholder="demo@minimals.cc"
                variant="outlined"
                density="comfortable"
              />

              <!-- Password Field -->
              <div class="password-section">
                <v-text-field
                  v-model="form.password"
                  label="Password"
                  placeholder="6+ characters"
                  type="password"
                  variant="outlined"
                  density="comfortable"
                />
                <div class="forgot-password-link">
                  <NuxtLink to="/auth/forgot-password" class="forgot-link">
                    Forgot password?
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
                Sign in
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
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { loginSchema, type LoginForm } from '~/types/validation'

const authStore = useAuthStore()
const router = useRouter()

// Form state
const form = reactive<LoginForm>({
  email: 'demo@minimals.cc',
  password: ''
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
  layout: false, // No layout for login page
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
  background-color: rgb(var(--v-theme-background-default, #ffffff));
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* Top Header */
.top-header {
  width: 100%;
  height: 64px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
}

.header-content {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.help-section {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
}

.help-text {
  color: rgb(var(--v-theme-text-primary, #212b36));
  font-size: 14px;
  font-weight: 600;
  font-family: 'Public Sans', sans-serif;
  line-height: 22px;
}


.logo-section {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.logo {
  border-radius: 50%;
  background-color: rgb(255, 86, 48);
}

/* Main Content */
.main-content {
  display: flex;
  min-height: 100vh;
  width: 100%;
}

/* Left Panel */
.left-panel {
  width: 480px;
  min-height: 100vh;
  position: relative;
  background-color: rgb(var(--v-theme-background-default, #ffffff));
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
  width: 480px;
  padding: 0 24px;
  position: absolute;
  top: 274px;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 64px;
}

.welcome-text {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
}

.welcome-title {
  width: 100%;
  text-align: center;
  color: rgb(var(--v-theme-text-primary, #212b36));
  font-size: 48px;
  font-weight: 700;
  font-family: 'Barlow', sans-serif;
  line-height: 48px;
  margin: 0;
}

.welcome-subtitle {
  width: 100%;
  text-align: center;
  color: rgb(var(--v-theme-text-secondary, #637381));
  font-size: 16px;
  font-weight: 400;
  font-family: 'Public Sans', sans-serif;
  line-height: 24px;
  margin: 0;
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
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 40px;
}

.login-form-container {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* Form Header */
.form-header {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;
  overflow: hidden;
}

.form-title {
  width: 100%;
  text-align: center;
  color: rgb(var(--v-theme-text-primary, #212b36));
  font-size: 20px;
  font-weight: 700;
  font-family: 'Public Sans', sans-serif;
  line-height: 30px;
  margin: 0;
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
  margin-bottom: 24px;
}

/* Login Form */
.login-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
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
  .left-panel {
    display: none;
  }

  .right-panel {
    padding: 0 16px;
  }

  .top-header {
    padding: 0 16px;
  }

  .welcome-content {
    padding: 0 16px;
    top: 120px;
  }

  .welcome-title {
    font-size: 36px;
    line-height: 48px;
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
  .main-content {
    flex-direction: column;
  }

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
</style>
