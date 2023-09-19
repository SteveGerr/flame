import { createApp } from "vue";
// eslint-disable-next-line import/no-extraneous-dependencies
import VueAxios from "vue-axios";
// eslint-disable-next-line import/no-extraneous-dependencies
import axios from "axios";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp(App);
app.provide("axios", app.config.globalProperties.axios);

createApp(App).use(store).use(router).use(VueAxios, axios).mount("#app");
