import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'portal',
      filename: 'remoteEntry.js',
      remotes: {
        header: 'http://localhost:5001/assets/remoteEntry.js',
        auth: 'http://localhost:5002/assets/remoteEntry.js',
      },
      shared: ['vue', 'vuex'],
    }),
  ],
});
