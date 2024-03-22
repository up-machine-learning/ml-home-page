import { https } from "@/utils/axios.helpter";
import axios from "axios";
import { defineStore } from "pinia";

const baseURL = import.meta.env.VITE_CORE_API_BASE_URL;
export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
  }),
  actions: {
    async login(body: any) {
      await axios
        .post(baseURL + "api/token", body, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
        });
      return 1;
    },

    async register(body: any) {
      return await https.post("api/register", body);
    },

    async logout() {
      localStorage.removeItem("token");
      return 1;
    },
  },
});
