<script setup>
import { useAuthStore } from "@/stores/auth.store.ts";
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import { reactive } from "vue";

const authStore = useAuthStore();

const loginForm = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});

const onLogin = async () => {
  const response = await authStore.login(loginForm);
};
</script>

<template>
  <div class="d-flex align-items-center h-100">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-12 col-lg-10">
          <div class="wrap d-md-flex">
            <div class="img"> </div>
            <div class="relative p-4 p-md-5">
              <div class="d-flex">
                <div class="w-100">
                  <h3 class="mb-4">Sign Up</h3>
                </div>
              </div>
              <form>
                <div class="form-group mb-3">
                  <label class="label" for="username">Username</label><br />
                  <InputText
                    v-model="loginForm.username"
                    id="username"
                    class="w-100"
                  />
                </div>
                <div class="form-group mb-3">
                  <label class="label" for="password">Password</label><br />
                  <Password
                    v-model="loginForm.password"
                    id="password"
                    toggleMask
                  />
                </div>
                <div class="form-group mb-3">
                  <label class="label" for="confirm_password"
                    >Confirm Password</label
                  ><br />
                  <Password
                    v-model="loginForm.confirmPassword"
                    id="confirm_password"
                    toggleMask
                    :invalid="
                      loginForm.confirmPassword &&
                      loginForm.password !== loginForm.confirmPassword
                    "
                  />
                  <br />
                  <small
                    class="text-danger"
                    v-if="
                      loginForm.confirmPassword &&
                      loginForm.password !== loginForm.confirmPassword
                    "
                    >Password doesn't match</small
                  >
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    @click="onLogin"
                    class="form-control btn btn-primary rounded submit px-3"
                    >Sign Up</button
                  >
                </div>
              </form>
              <br />
              <p class="">
                <a data-toggle="tab" @click="$router.push('/login')"
                  >Sign In</a
                ></p
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrap {
  width: 100%;
  overflow: hidden;
  background: #fff;
  border-radius: 5px;
  -webkit-box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
  box-shadow: 0px 10px 34px -15px rgba(0, 0, 0, 0.24);
}
.img {
  background-image: url("./src/assets/img/login_side.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  width: 50%;
}
</style>
