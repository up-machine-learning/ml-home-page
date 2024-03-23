<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <a class="navbar-brand" href="#">
        <img
          src="http://www.ces-cam.org/wp-content/uploads/2021/05/UP-short-.png"
          alt=""
          width="30"
          height="24"
          class="d-inline-block align-text-top"
        />
        Smart Trip Sugguestion
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
            <RouterLink to="/" class="nav-link" active-class="active"
              >Home</RouterLink
            >
          </li>
          <li class="nav-item">
            <RouterLink to="/destination" class="nav-link" active-class="active"
              >Destination</RouterLink
            >
          </li>
          <li class="nav-item">
            <div class="d-flex">
              <Button
                label="Train Model"
                severity="warning"
                :loading="isTraining"
                @click="onTrainModel()"
                class="rounded me-2"
              />
              <Button
                label="Logout"
                @click="onLogout"
                class="rounded"
                icon="pi pi-sign-out"
                iconPos="right"
              />
              <Toast />
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/stores/auth.store";
import { https } from "@/utils/axios.helpter";
import Button from "primevue/button";
import Toast from "primevue/toast";
import { useToast } from "primevue/usetoast";
import { ref } from "vue";
import { useRouter } from "vue-router";

const toast = useToast();
const router = useRouter();
const authStore = useAuthStore();
const isTraining = ref(false);
const onLogout = async () => {
  const response = await authStore.logout();
  if (response) {
    router.replace({ name: "Login" });
  }
};

const onTrainModel = async () => {
  isTraining.value = true;
  await https.post("api/trip/model/build").then(
    (res) => {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Your sentiment model has been trained successfully",
        life: 3000,
      });
      isTraining.value = false;
    },
    (error) => {
      toast.add({
        severity: "error",
        summary: "Error",
        detail: error.response.data.detail,
        life: 3000,
      });
      isTraining.value = false;
    }
  );
};
</script>

<style></style>
