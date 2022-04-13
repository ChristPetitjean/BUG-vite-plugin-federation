import { createApp } from 'vue';
import axios from 'axios';

import App from './App.vue';
import router from './router';

import { createAuth } from 'auth/auth';

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
