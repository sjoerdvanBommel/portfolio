import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import { resolve } from 'path';

export default defineConfig({
  server: {
    port: 3000,
  },
  publicDir: resolve(__dirname, '../../public'),
  plugins: [
    tailwindcss(),
    vitePluginSingleSpa({
    type: 'root',
    importMaps: {
      dev: 'src/importMap.dev.json',
      build: 'src/importMap.json'
    },
  })],
  define: {
    // enable hydration mismatch details in production build
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  }
})
