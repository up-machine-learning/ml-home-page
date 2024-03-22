import "bootstrap/dist/css/bootstrap.css";
import { createPinia } from "pinia";
import "primeicons/primeicons.css";
import PrimeVue from "primevue/config";
import "primevue/resources/themes/aura-light-green/theme.css";
import Tooltip from "primevue/tooltip";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./style.css";

const pinia = createPinia();
const app = createApp(App);
app.directive("tooltip", Tooltip);
app.use(pinia);
app.use(PrimeVue);
app.use(router);
app.mount("#app");
