import { defineConfig } from 'vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [vitePluginSingleSpa({
    type: 'root',
    importMaps: {
      dev: 'apps/root/src/importMap.dev.json',
      build: 'apps/root/src/importMap.json'
    }
  })],
})
