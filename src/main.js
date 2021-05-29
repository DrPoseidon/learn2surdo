import Vue from "vue";
import router from "Router";
import App from "./App.vue";
import store from "Store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
