<template>
  <div class="hidden md:flex flex-col items-center justify-center gap-8 p-4 w-full max-w-md min-h-screen rounded-lg bg-white dark:bg-gray-900">
    <div class="text-center">
      <h3 class="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">{{ title }}</h3>

      <p v-if="subtitle" class="text-base text-gray-900 dark:text-gray-100 mt-2">
        {{ subtitle }}
      </p>
    </div>

    <div class="w-full">
      <v-img
        :src="imgUrl"
        alt="Auth illustration"
        aspect-ratio="4/3"
        cover
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string
  subtitle?: string
  imgUrl?: string
  layoutQuery?: string
}

withDefaults(defineProps<Props>(), {
  title: 'Manage the job',
  subtitle: 'More effectively with optimized workflows.',
  imgUrl: '/assets/illustrations/illustration-dashboard.webp',
  layoutQuery: 'md'
})
</script>
