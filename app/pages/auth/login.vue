<template>
  <div class="login-page">
    <div class="form-header">
      <h5 class="form-title">{{ t('auth.signInToAccount') }}</h5>

      <div class="register-link">
        <span class="register-text">{{ t('auth.dontHaveAccount') }}</span>
        <NuxtLink to="/auth/register" class="register-link-text">
          {{ t('auth.signUp') }}
        </NuxtLink>
      </div>
    </div>

    <GkAlert type="info" variant="info" class="info-alert mb-6">
      {{ t('auth.demoCredentialsWith') }} <strong>{{ form.email }}</strong> {{ t('auth.demoCredentials') }} <strong>{{ form.password }}</strong>
    </GkAlert>

    <GkAlert v-if="errorMsg" type="error" variant="danger" class="error-alert mb-6" role="alert">
      {{ errorMsg }}
    </GkAlert>

    <div class="login-form">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
        <GkField :label="t('auth.email')" :error="errors.email?.[0]">
          <GkInput
            v-model="form.email"
            type="email"
            name="email"
            autocomplete="username"
            placeholder="godpanel"
          />
        </GkField>

        <div class="password-field flex flex-col gap-2">
          <NuxtLink to="/auth/forgot-password" class="forgot-link">
            {{ t('auth.forgotPassword') }}
          </NuxtLink>

          <GkField :label="t('auth.password')" :error="errors.password?.[0]">
            <div class="flex gap-2 items-start">
              <GkInput
                v-model="form.password"
                :type="passwordVisible ? 'text' : 'password'"
                name="password"
                autocomplete="current-password"
                :placeholder="t('auth.passwordPlaceholder')"
                class="flex-1"
              />
              <GkButton
                type="button"
                variant="ghost"
                slim
                :aria-label="passwordVisible ? 'Hide password' : 'Show password'"
                @click="passwordVisible = !passwordVisible"
              >
                <AppIcon :name="passwordVisible ? 'eye-off' : 'eye'" :size="20" />
              </GkButton>
            </div>
          </GkField>
        </div>

        <GkButton
          type="submit"
          block
          :loading="isSubmitting"
          class="signin-btn"
        >
          {{ isSubmitting ? t('auth.signInLoading') : t('auth.signIn') }}
        </GkButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { ZodError } from 'zod'
import { loginSchema, type LoginForm } from '~/types/validation'
import { useI18n } from 'vue-i18n'
import { GkAlert, GkButton, GkField, GkInput } from 'god-kit/vue'
import AppIcon from '~/components/ui/AppIcon.vue'

const { t } = useI18n()

const authStore = useAuthStore()
const router = useRouter()

const passwordVisible = ref(false)
const errorMsg = ref('')

const form = reactive<LoginForm>({
  email: 'godpanel@test.com',
  password: 'god123'
})

const errors = ref<Record<string, string[]>>({})
const isSubmitting = ref(false)

const validateForm = () => {
  try {
    loginSchema.parse(form)
    errors.value = {}
    return true
  } catch (error: unknown) {
    if (error instanceof ZodError) {
      errors.value = error.flatten().fieldErrors as Record<string, string[]>
    }
    return false
  }
}

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
  } catch (error: unknown) {
    console.error('Login error:', error)
    errorMsg.value = error instanceof Error ? error.message : 'Login failed. Please try again.'
  } finally {
    isSubmitting.value = false
  }
}

definePageMeta({
  layout: 'auth',
  middleware: 'guest'
})

useHead({
  title: t('auth.signInToAccount') + ' - God Panel'
})
</script>

<style scoped>
.login-page {
  width: 100%;
  margin: 0 auto;
}

.form-header {
  margin-bottom: 32px;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  color: var(--gk-color-on-surface);
  margin-bottom: 16px;
  text-align: start;
}

.register-link {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
}

.register-text {
  font-size: 14px;
  color: var(--gk-color-on-surface);
}

.register-link-text {
  font-size: 14px;
  color: var(--gk-color-primary);
  text-decoration: none;
  font-weight: 500;
  text-align: start;
}

.forgot-link {
  font-size: 14px;
  color: var(--gk-color-primary);
  text-decoration: none;
  align-self: flex-start;
}

[dir="ltr"] .forgot-link {
  align-self: flex-end;
}

.forgot-link:hover {
  text-decoration: underline;
}

.signin-btn {
  height: 44px;
  margin-top: 8px;
}

[dir="rtl"] .login-form {
  direction: rtl;
}

[dir="rtl"] .register-link {
  flex-direction: row-reverse;
}

@media (max-width: 480px) {
  .form-title {
    font-size: 20px;
  }
}
</style>
