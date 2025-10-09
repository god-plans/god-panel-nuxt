export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // If user is authenticated, redirect to dashboard
  if (authStore.isAuthenticated && !authStore.loading) {
    return navigateTo('/dashboard')
  }
})
