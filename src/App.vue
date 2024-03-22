<script setup lang="ts">
import { computed } from "vue";
import { RouterView, useRoute } from "vue-router";
import LayoutDefault from "./pages/LayoutDefault.vue";

const route = useRoute();

const blankTemplate = ["Login", "Register"];
const isBlankTemplate = computed(() => {
  return blankTemplate.includes(route.name as string);
});
</script>

<template>
  <RouterView v-if="isBlankTemplate" />
  <LayoutDefault v-else>
    <RouterView />
  </LayoutDefault>
</template>

<style scoped></style>
