<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-primary text-on-primary p-4">
      <div class="container mx-auto">
        <h1 class="text-2xl font-bold">{{ $config.public.appName }}</h1>
      </div>
    </header>

    <main class="flex-1 p-4">
      <slot />
    </main>

    <footer class="bg-surface text-on-surface p-4 text-center">
      <p>&copy; {{ new Date().getFullYear() }} {{ $config.public.appName }}</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Simple layout without complex components for testing
</script>
