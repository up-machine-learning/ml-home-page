<template>
  <HeaderComponent></HeaderComponent>
  <main>
    <div style="z-index: 2; height: 100%">
      <slot></slot>
    </div>
  </main>
</template>

<script setup lang="ts">
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<style scoped>
main {
  position: relative;
  height: 100%;
  width: 100%;
  z-index: 2;
  overflow: auto;
}
main::before {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72%;
  height: 72%;
  background: url("@/assets/map_bg.svg");
  background-attachment: fixed;
  max-width: 80%;
  background-size: auto;
  background-repeat: no-repeat;
  background-position: center center;
  z-index: -1;
}
</style>
