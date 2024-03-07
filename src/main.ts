import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

import { IonicVue } from "@ionic/vue";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/**
 * VueFire (firebase)
 */
import { VueFire, VueFireAuth } from "vuefire";
import { firebaseApp } from "./firebase";

/**
 * Pinia State manager
 */
import { markRaw } from 'vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
pinia.use(({store}) => {
  store.$router = markRaw(router)
})

const app = createApp(App)
  .use(IonicVue)
  .use(VueFire, {
    firebaseApp,
    modules: [VueFireAuth()],
  })
  .use(pinia)
  .use(router);

router.isReady().then(() => {
  app.mount("#app");
});
