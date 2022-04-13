import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createAuth } from './auth';
import axios from 'axios';

createAuth({
  router,
  autoConfigureNavigationGuards: true,
  axios: {
    instance: axios.create(),
    autoAddAuthorizationHeader: true,
  },
}).then((auth) => {
  const app = createApp(App);
  app.use(router);
  app.use(auth);
  app.mount('#app');
});
