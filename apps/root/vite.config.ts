import { defineConfig } from 'vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [vitePluginSingleSpa({
    type: 'root',
    importMaps: {
      dev: 'src/importMap.dev.json',
      build: 'src/importMap.json'
    },
  })],
})
