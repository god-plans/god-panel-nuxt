<template>
  <component
    :is="componentType"
    :src="logoSrc"
    :width="logoWidth"
    :height="logoHeight"
    :alt="altText"
    :class="logoClass"
    :style="logoStyle"
    v-bind="componentProps"
    @click="navigateTo('/')"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useSettingsStore } from '~/stores/settings';


const settingsStore = useSettingsStore();


interface Props {
  variant?: "full" | "compact" | "mono" | "icon";
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  class?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "full",
  size: "md",
});

const componentType = computed(() => {
  return "img";
});

const logoSrc = computed(() => {
  const isDarkMode = settingsStore.isDarkMode
  console.log(isDarkMode);
  switch (props.variant) {
    case "full":
      return isDarkMode ? "/god-pure-dark-full.png" : "/full-logo.png";
    case "compact":
      return isDarkMode ? "/god-pure-dark-full.png" : "/full-logo.png";
    case "mono":
      return isDarkMode ? "/god-pure-dark.png" : "/full-logo.png";
    case "icon":
      return isDarkMode ? "/god-pure-dark.png" : "/logo.png";
    default:
      return isDarkMode ? "/god-pure-dark.png" : "/logo.png";
  }
});

const logoDimensions = computed(() => {
  const baseSizes = {
    full: { width: 180, height: 40 },
    compact: { width: 120, height: 32 },
    mono: { width: 180, height: 40 },
    icon: { width: 32, height: 32 },
  };

  const base = baseSizes[props.variant];
  const multiplier = {
    sm: 0.75,
    md: 1,
    lg: 1.25,
    xl: 1.5,
  }[props.size];

  return {
    width: Math.round(base.width * multiplier),
    height: Math.round(base.height * multiplier),
  };
});

const logoWidth = computed(() => logoDimensions.value.width);
const logoHeight = computed(() => logoDimensions.value.height);

const altText = computed(() => "Gods Projects - Divine Innovation");

const logoClass = computed(() => {
  const classes = ["gods-logo"];
  if (props.class) classes.push(props.class);
  return classes.join(" ");
});

const logoStyle = computed(() => {
  if (props.color && props.variant === "mono") {
    return { color: props.color };
  }
  return {};
});

const componentProps = computed(() => {
  const props: Record<string, any> = {
    width: logoWidth.value,
    height: logoHeight.value,
    alt: altText.value,
    class: logoClass.value,
    loading: "lazy",
  };

  if (logoStyle.value.color) {
    props.style = logoStyle.value;
  }

  return props;
});
</script>

<style scoped>
.gods-logo {
  @apply transition-all duration-200;
}

.gods-logo:hover {
  @apply scale-[1.02];
}
</style>
