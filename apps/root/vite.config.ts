import { defineConfig } from 'vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import { APPS } from './src/config';

export default defineConfig({
  server: {
    port: APPS.ROOT.port,
  },
  plugins: [vitePluginSingleSpa({
    type: 'root',
    importMaps: {
      dev: 'src/importMap.dev.json',
      build: 'src/importMap.json'
    },
  })],
})
