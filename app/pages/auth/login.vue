<template>
  <div class="login-page">
    <v-container fluid class="login-container">
      <v-row class="login-row">
        <v-col cols="12" md="6" class="login-form-col">
          <v-card class="login-card pa-8">
            <v-card-title class="text-center mb-6">
              <h1 class="login-title">Welcome Back</h1>
              <p class="login-subtitle">Sign in to your account</p>
            </v-card-title>

            <v-card-text>
              <form @submit.prevent="handleSubmit">
                <v-text-field
                  v-model="form.email"
                  label="Email"
                  type="email"
                  variant="outlined"
                  :error-messages="errors.email"
                  prepend-inner-icon="mdi-email"
                  class="mb-4"
                />

                <v-text-field
                  v-model="form.password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  :error-messages="errors.password"
                  prepend-inner-icon="mdi-lock"
                  class="mb-6"
                />

                <v-btn
                  type="submit"
                  color="primary"
                  size="large"
                  block
                  :loading="loading"
                  class="mb-4"
                >
                  Sign In
                </v-btn>

                <div class="text-center">
                  <router-link to="/auth/register" class="text-decoration-none">
                    Don't have an account? Sign up
                  </router-link>
                </div>
              </form>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="login-image-col">
          <div class="login-image">
            <v-icon size="120" color="primary" class="mb-4">mdi-account-circle</v-icon>
            <h2>Secure Access</h2>
            <p>Your data is protected with enterprise-grade security</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup lang="ts">
import { loginSchema, type LoginForm } from '~/types/validation'

const authStore = useAuthStore()
const router = useRouter()

// Form state
const form = reactive<LoginForm>({
  email: '',
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

    if (result.success) {
      await router.push('/dashboard')
    } else {
      // Handle error - you might want to show a snackbar
      console.error('Login failed:', result.error)
    }
  } catch (error) {
    console.error('Login error:', error)
  } finally {
    loading.value = false
  }
}

// Redirect if already authenticated
if (authStore.isAuthenticated) {
  await router.push('/dashboard')
}

// Page meta
definePageMeta({
  layout: 'default',
  middleware: 'guest'
})

// SEO
useHead({
  title: 'Login - God Panel'
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
}

.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
}

.login-card {
  max-width: 400px;
  margin: 0 auto;
  border-radius: 16px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.login-title {
  font-size: 2rem;
  font-weight: 700;
  color: #2d3748;
  margin-bottom: 0.5rem;
}

.login-subtitle {
  color: #718096;
  margin-bottom: 0;
}

.login-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: white;
  text-align: center;
  padding: 2rem;
}

.login-image h2 {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.login-image p {
  font-size: 1.125rem;
  opacity: 0.9;
  max-width: 300px;
}

/* Responsive */
@media (max-width: 768px) {
  .login-row {
    flex-direction: column-reverse;
  }

  .login-image-col {
    min-height: 200px;
  }

  .login-card {
    margin: 2rem auto;
  }
}
</style>
