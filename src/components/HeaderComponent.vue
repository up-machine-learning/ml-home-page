<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">
        <!-- <img
          src="https://getbootstrap.com/docs/5.0/assets/brand/bootstrap-logo.svg"
          alt=""
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        /> -->
        UP ML
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mb-2 ms-auto mb-lg-0">
          <li class="nav-item">
            <RouterLink to="/" class="nav-link">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/destination" class="nav-link"
              >Destination</RouterLink
            >
          </li>
          <li class="nav-item">
            <Button
              label="Logout"
              @click="onLogout"
              class="rounded"
              icon="pi pi-sign-out"
              iconPos="right"
            />
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const router = useRouter();
const authStore = useAuthStore();
const onLogout = async () => {
  const response = await authStore.logout();
  if (response) {
    router.replace({ name: "Login" });
  }
};
</script>

<style></style>
