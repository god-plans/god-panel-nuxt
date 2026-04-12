<template>
  <transition
    name="motion-lazy"
    appear
    @enter="onEnter"
    @after-enter="onAfterEnter"
  >
    <div v-if="isVisible" class="motion-lazy-container">
      <slot />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
interface Props {
  threshold?: number
  rootMargin?: string
}

const props = withDefaults(defineProps<Props>(), {
  threshold: 0,
  rootMargin: '50px'
})

const isVisible = ref(false)

const onEnter = (el: Element) => {
  const node = el as HTMLElement
  node.style.opacity = '0'
  node.style.transform = 'translateY(20px)'
}

const onAfterEnter = (el: Element) => {
  const node = el as HTMLElement
  node.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
  node.style.opacity = '1'
  node.style.transform = 'translateY(0)'
  // Non-none transform on an ancestor breaks position:fixed for descendants; clear after enter transition.
  window.setTimeout(() => {
    node.style.transform = ''
  }, 650)
}

// Use Intersection Observer for lazy loading
let observer: IntersectionObserver | null = null

const observeElement = (el: Element) => {
  if (observer) observer.disconnect()

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isVisible.value = true
          if (observer) observer.disconnect()
        }
      })
    },
    {
      threshold: props.threshold,
      rootMargin: props.rootMargin
    }
  )

  observer.observe(el)
}

onMounted(() => {
  // Use nextTick to ensure DOM is ready
  nextTick(() => {
    const el = document.querySelector('.motion-lazy-container')
    if (el) {
      observeElement(el)
    } else {
      // Fallback: show immediately if element not found
      isVisible.value = true
    }
  })
})

onUnmounted(() => {
  if (observer) {
    observer.disconnect()
  }
})
</script>

<style scoped>
.motion-lazy-container {
  width: 100%;
}

.motion-lazy-enter-active {
  transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.motion-lazy-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

.motion-lazy-enter-to {
  opacity: 1;
  transform: translateY(0);
}

@media (prefers-reduced-motion: reduce) {
  .motion-lazy-enter-active,
  .motion-lazy-enter-from,
  .motion-lazy-enter-to {
    transition: none !important;
    transform: none !important;
    opacity: 1 !important;
  }
}
</style>
