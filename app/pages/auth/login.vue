<template>
  <div class="login">
    <header class="login__header">
      <h1 class="login__title">{{ t('auth.signInToAccount') }}</h1>
      <p class="login__sub">
        {{ t('auth.dontHaveAccount') }}
        <NuxtLink to="/auth/register" class="login__link">{{ t('auth.signUp') }}</NuxtLink>
      </p>
    </header>

    <GkAlert v-if="demoMode" variant="info" class="mb-6">
      {{ t('auth.demoCredentialsWith') }} <strong>{{ demo.email }}</strong>
      {{ t('auth.demoCredentials') }} <strong>{{ demo.password }}</strong>
      <GkButton variant="ghost" slim class="mt-2" @click="fillDemo">
        {{ t('auth.useDemoCredentials') }}
      </GkButton>
    </GkAlert>

    <GkAlert v-if="errorMessage" variant="danger" class="mb-6" role="alert">
      {{ errorMessage }}
    </GkAlert>

    <form class="login__form" novalidate @submit.prevent="submit">
      <GkField :label="t('auth.email')" :error="errors.email">
        <GkInput
          v-model="form.email"
          type="email"
          name="email"
          autocomplete="username"
          placeholder="you@example.com"
        />
      </GkField>

      <GkField :label="t('auth.password')" :error="errors.password">
        <div class="login__password">
          <GkInput
            v-model="form.password"
            :type="passwordVisible ? 'text' : 'password'"
            name="password"
            autocomplete="current-password"
            :placeholder="t('auth.passwordPlaceholder')"
            class="login__password-input"
          />
          <GkButton
            type="button"
            variant="ghost"
            slim
            :aria-label="passwordVisible ? t('auth.hidePassword') : t('auth.showPassword')"
            :aria-pressed="passwordVisible"
            @click="passwordVisible = !passwordVisible"
          >
            <AppIcon :name="passwordVisible ? 'eye-off' : 'eye'" :size="20" />
          </GkButton>
        </div>
      </GkField>

      <NuxtLink to="/auth/forgot-password" class="login__link login__forgot">
        {{ t('auth.forgotPassword') }}
      </NuxtLink>

      <GkButton type="submit" block :loading="submitting" class="login__submit">
        {{ submitting ? t('auth.signInLoading') : t('auth.signIn') }}
      </GkButton>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { GkAlert, GkButton, GkField, GkInput } from 'god-kit/vue'
import { loginSchema, type LoginForm } from '~/types/validation'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const auth = useAuthStore()

const demoMode = useRuntimeConfig().public.demoMode
const demo = auth.demoCredentials

const form = reactive<LoginForm>({ email: '', password: '' })
const errors = reactive<{ email?: string; password?: string }>({})
const errorMessage = ref('')
const passwordVisible = ref(false)
const submitting = ref(false)

function fillDemo() {
  form.email = demo.email
  form.password = demo.password
}

function validate(): boolean {
  const result = loginSchema.safeParse(form)
  errors.email = undefined
  errors.password = undefined

  if (result.success) return true

  for (const issue of result.error.issues) {
    const field = issue.path[0]
    if (field === 'email' || field === 'password') {
      errors[field] ??= issue.message
    }
  }
  return false
}

async function submit() {
  errorMessage.value = ''
  if (!validate()) return

  submitting.value = true
  const result = await auth.login(form)
  submitting.value = false

  if (!result.success) {
    errorMessage.value = result.error
    return
  }

  // Return the user to the page the auth middleware pulled them off of.
  const redirect = route.query.redirect
  await router.push(typeof redirect === 'string' ? redirect : '/dashboard')
}

definePageMeta({ layout: 'auth', middleware: 'guest' })
useHead({ title: 'Sign in — God Panel' })
</script>

<style scoped>
.login {
  width: 100%;
}

.login__header {
  margin-bottom: 2rem;
}

.login__title {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--gk-color-on-surface);
}

.login__sub {
  margin: 0;
  font-size: 0.875rem;
  color: var(--gk-color-on-surface-muted);
}

.login__link {
  color: var(--gk-color-primary);
  font-weight: 500;
  text-decoration: none;
}

.login__link:hover {
  text-decoration: underline;
}

.login__form {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.login__password {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.login__password-input {
  flex: 1 1 auto;
  min-width: 0;
}

.login__forgot {
  align-self: flex-end;
  font-size: 0.875rem;
}

[dir='rtl'] .login__forgot {
  align-self: flex-start;
}

.login__submit {
  height: 44px;
  margin-top: 0.25rem;
}

@media (max-width: 480px) {
  .login__title {
    font-size: 1.25rem;
  }
}
</style>
