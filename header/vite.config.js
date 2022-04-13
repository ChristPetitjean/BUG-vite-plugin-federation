import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'header',
      filename: 'remoteEntry.js',
      // remotes: {
      //   'periscolaire-auth': 'http://localhost:5002/assets/remoteEntry.js',
      // },
      exposes: {
        './NavBar': './src/components/NavBar.vue',
        './HeaderLink': './src/components/HeaderLink.vue',
      },
      shared: ['vue', 'vue-router'],
    }),
  ],
  build: {
    assetsInlineLimit: 40960,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
});
