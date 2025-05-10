import { defineConfig } from 'vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import { mergeConfig } from 'vite'
import { viteConfigMife } from '@sjoerdvanbommel-packages/config'

export default mergeConfig(viteConfigMife(3000), defineConfig({
  publicDir: false,
  plugins: [
    vitePluginSingleSpa({
      type: 'root',
      importMaps: {
        dev: 'src/importMap.dev.json',
        build: 'src/importMap.json'
      },
    }),
  ],
}))
