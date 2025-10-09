export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  // If user is not authenticated, redirect to login
  if (!authStore.isAuthenticated && !authStore.loading) {
    return navigateTo('/auth/login')
  }
})
