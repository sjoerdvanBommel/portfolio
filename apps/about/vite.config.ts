import dotenv from 'dotenv'
import { viteConfigMife } from '@sjoerdvanbommel-packages/config'
import { mergeConfig, defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

dotenv.config({ path: ['../../.env', '.env'] })

export default mergeConfig(viteConfigMife(3004), defineConfig({
  plugins: [
    svelte()
  ]
}))
