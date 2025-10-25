<template>
  <!--  "auth": {
    "welcomeBack": "خوش آمدید",
    "signInToAccount": "به حساب خود وارد شوید",
    "signIn": "ورود",
    "signInLoading": "در حال ورود...",
    "forgotPassword": "رمز عبور را فراموش کرده اید؟",
    "dontHaveAccount": "حساب کاربری ندارید؟",
    "signUp": "ثبت نام",
    "createAccount": "ایجاد حساب",
    "alreadyHaveAccount": "قبلاً حساب کاربری دارید؟",
    "signInHere": "اینجا وارد شوید",
    "resetPassword": "بازنشانی رمز عبور",
    "enterEmailToReset": "ایمیل خود را برای بازنشانی رمز عبور وارد کنید",
    "sendResetLink": "ارسال لینک بازنشانی",
    "backToSignIn": "بازگشت به ورود",
    "passwordResetSent": "لینک بازنشانی رمز عبور به ایمیل شما ارسال شد",
    "invalidCredentials": "ایمیل یا رمز عبور نامعتبر",
    "accountCreated": "حساب کاربری با موفقیت ایجاد شد",
    "demoCredentials": "استفاده کنید",
    "demoCredentialsWith": "با رمز عبور",
    "logoutConfirm": "آیا مطمئن هستید که می‌خواهید خارج شوید؟",
    "logoutConfirmTitle": "تأیید خروج",
    "logoutConfirmMessage": "آیا مطمئن هستید که می‌خواهید از حساب خود خارج شوید؟",
    "logoutConfirmNote": "برای دسترسی به داشبورد خود نیاز به ورود مجدد دارید.",
    "welcomeTitle": "مدیریت کار",
    "welcomeSubtitle": "به طور مؤثرتری با گردش کار بهینه شده.",
    "log -->
  <div class="min-h-screen flex items-center justify-center p-6">
    <!-- Form Header -->
    <div class="mb-8 w-full max-w-md">
      <h5 class="text-xl font-semibold text-on-surface mb-4 text-left">{{ t('auth.signInToAccount') }}</h5>

      <div class="flex items-center gap-1 mb-6">
        <span class="text-sm text-on-surface-variant">{{ t('auth.dontHaveAccount') }}</span>
        <NuxtLink to="/auth/register" class="text-sm text-primary no-underline font-medium hover:underline">
          {{ t('auth.signUp') }}
        </NuxtLink>
      </div>
    </div>

    <!-- Info Alert -->
    <v-alert
      type="info"
      variant="tonal"
      density="comfortable"
      class="mb-6 w-full max-w-md"
    >
      {{ t('auth.demoCredentialsWith') }} <strong>{{ form.email }}</strong> {{ t('auth.demoCredentials') }} <strong>{{ form.password }}</strong>
    </v-alert>

    <!-- Error Alert -->
    <v-alert
      v-if="errorMsg"
      type="error"
      variant="tonal"
      density="comfortable"
      class="mb-6 w-full max-w-md"
    >
      {{ errorMsg }}
    </v-alert>

    <!-- Login Form -->
    <div class="w-full max-w-md">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
        <!-- Email Field -->
        <v-text-field
          v-model="form.email"
          :label="t('auth.email')"
          placeholder="godpanel"
          variant="outlined"
          density="comfortable"
          :error-messages="errors.email"
        />

        <!-- Password Field -->
        <div class="mb-6">
          <div class="flex justify-end mb-2">
            <NuxtLink to="/auth/forgot-password" class="text-sm text-primary no-underline hover:underline">
              {{ t('auth.forgotPassword') }}
            </NuxtLink>
          </div>

          <v-text-field
            v-model="form.password"
            :label="t('auth.password')"
            :placeholder="t('auth.passwordPlaceholder')"
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
          class="h-11 mt-2"
        >
          {{ isSubmitting ? t('auth.signInLoading') : t('auth.signIn') }}
        </v-btn>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { loginSchema, type LoginForm } from '~/types/validation'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const authStore = useAuthStore()
const router = useRouter()

// Password visibility toggle
const passwordVisible = ref(false)

// Error state
const errorMsg = ref('')

// Form state
const form = reactive<LoginForm>({
  email: 'godpanel@test.com',
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
  title: t('auth.signInToAccount') + ' - God Panel'
})
</script>

