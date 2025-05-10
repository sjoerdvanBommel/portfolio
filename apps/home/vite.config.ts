import dotenv from 'dotenv'
import { viteConfigMife } from '@sjoerdvanbommel-packages/config'
import { mergeConfig, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

dotenv.config({ path: ['../../.env', '.env'] })

export default mergeConfig(viteConfigMife(3003), defineConfig({
  plugins: [
    vue()
  ]
}))
