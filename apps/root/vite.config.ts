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
})
