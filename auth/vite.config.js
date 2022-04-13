import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: 'periscolaire-auth',
      filename: 'remoteEntry.js',
      exposes: {
        './auth': './src/auth/index.ts',
      },
      shared: [
        {
          vue: {
            singleton: true,
            import: false,
          },
        },
        {
          'vue-router': {
            singleton: true,
            import: false,
          },
        },
        {
          axios: {
            singleton: true,
            import: false,
          },
        },
        // {
        //   auth: {
        //     singleton: true,
        //     import: false,
        //   },
        // },
      ],
    }),
  ],
  build: {
    assetsInlineLimit: 40960,
    target: 'esnext',
    minify: true,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
});
