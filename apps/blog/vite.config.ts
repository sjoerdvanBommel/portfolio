import dotenv from 'dotenv'
import { defineConfig, mergeConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteConfigMife } from '@sjoerdvanbommel-packages/config'

dotenv.config({ path: ['../../.env', '.env'] })

export default mergeConfig(viteConfigMife(3005, { isReact: true }), defineConfig({
  plugins: [
    react()
  ]
}))
