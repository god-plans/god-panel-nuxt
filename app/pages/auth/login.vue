<template>
  <div class="login-page">
    <!-- Form Header -->
    <div class="form-header">
      <h5 class="form-title">Sign in to your account</h5>

      <div class="register-link">
        <span class="register-text">Don't have an account?</span>
        <NuxtLink to="/auth/register" class="register-link-text">
          Sign Up
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
      Use <strong>{{ form.email }}</strong> with password <strong>{{ form.password }}</strong>
    </v-alert>

    <!-- Error Alert -->
    <v-alert
      v-if="errorMsg"
      type="error"
      variant="tonal"
      density="comfortable"
      class="error-alert"
    >
      {{ errorMsg }}
    </v-alert>

    <!-- Login Form -->
    <div class="login-form">
      <form @submit.prevent="handleSubmit">
        <!-- Email Field -->
        <v-text-field
          v-model="form.email"
          label="Email address"
          placeholder="godpanel"
          variant="outlined"
          density="comfortable"
          :error-messages="errors.email"
        />

        <!-- Password Field -->
        <div class="password-field">
          <NuxtLink to="/auth/forgot-password" class="forgot-link">
            Forgot Password?
          </NuxtLink>

          <v-text-field
            v-model="form.password"
            label="Password"
            placeholder="6+ characters"
            :type="passwordVisible ? 'text' : 'password'"
            variant="outlined"
            density="comfortable"
            :error-messages="errors.password"
          >
            <template #append-inner>
              <v-btn
                icon
                variant="text"
                size="small"
                @click="passwordVisible = !passwordVisible"
              >
                <v-icon size="20">
                  {{ passwordVisible ? 'mdi-eye-off' : 'mdi-eye' }}
                </v-icon>
              </v-btn>
            </template>
          </v-text-field>
        </div>

        <!-- Sign In Button -->
        <v-btn
          type="submit"
          size="large"
          block
          color="primary"
          :loading="isSubmitting"
          class="signin-btn"
        >
          {{ isSubmitting ? 'Signing in...' : 'Sign in' }}
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { loginSchema, type LoginForm } from '~/types/validation'

const authStore = useAuthStore()
const router = useRouter()

// Password visibility toggle
const passwordVisible = ref(false)

// Error state
const errorMsg = ref('')

// Form state
const form = reactive<LoginForm>({
  email: 'godpanel',
  password: 'god123'
})

const errors = ref<Record<string, string[]>>({})
const isSubmitting = ref(false)

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

  isSubmitting.value = true
  errorMsg.value = ''

  try {
    const result = await authStore.login(form)

    if (result?.success) {
      await router.push('/dashboard')
    } else {
      errorMsg.value = result?.error || 'Login failed. Please try again.'
    }
  } catch (error: any) {
    console.error('Login error:', error)
    errorMsg.value = error instanceof Error ? error.message : 'Login failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
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
  margin: 0 auto;
}

/* Form Header */
.form-header {
  margin-bottom: 32px;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
  margin-bottom: 16px;
  text-align: left;
}

.register-link {
  display: flex;
  align-items: center;
  gap: 4px;
}

.register-text {
  font-size: 14px;
  color: rgb(var(--v-theme-on-surface-variant));
}

.register-link-text {
  font-size: 14px;
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  font-weight: 500;
}

/* Alerts */
.info-alert {
  margin-bottom: 24px;
}

.error-alert {
  margin-bottom: 24px;
}

/* Login Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Password Field */
.password-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.forgot-link {
  font-size: 14px;
  color: rgb(var(--v-theme-primary));
  text-decoration: none;
  align-self: flex-end;
}

.forgot-link:hover {
  text-decoration: underline;
}

/* Form inputs */
.login-form :deep(.v-text-field) {
  margin-bottom: 0;
}

/* Sign In Button */
.signin-btn {
  height: 44px;
  margin-top: 8px;
}

/* Mobile Styles */
@media (max-width: 480px) {
  .form-title {
    font-size: 20px;
  }
}
</style>
