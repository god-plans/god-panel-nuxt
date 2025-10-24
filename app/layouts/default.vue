<template>
  <div class="default-layout">
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold">{{ $config.public.appName }}</h1>
      </div>
    </header>

    <main class="flex-1 p-4">
      <slot />
    </main>

    <footer class="bg-gray-800 text-white p-4 text-center">
      <p>&copy; {{ new Date().getFullYear() }} {{ $config.public.appName }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Simple layout without complex components for testing
</script>

<style scoped>
.default-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
</style>
