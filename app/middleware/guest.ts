/** Keeps signed-in users out of the auth pages. */
export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  if (auth.isAuthenticated) {
    return navigateTo('/dashboard')
  }
})
