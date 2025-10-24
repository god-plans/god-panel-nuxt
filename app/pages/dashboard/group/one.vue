<template>
  <v-container class="v-card my-4 rounded-lg">
    <v-row>
      <v-col cols="12">
        <CommonBlank :title="$t('pages.groups.one')" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

// Page meta
definePageMeta({
  layout: "dashboard",
  middleware: "auth",
});

// SEO
useHead({
  title: "Group One - God Panel",
});
</script>

<style scoped>

</style>