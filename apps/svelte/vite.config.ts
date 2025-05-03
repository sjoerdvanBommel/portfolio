import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import dotenv from 'dotenv'

dotenv.config({ path: ['../../.env', '.env'] })

export default defineConfig({
  server: {
    port: 3002,
    hmr: process.env.HMR === '1'
  },
  plugins: [svelte(), vitePluginSingleSpa(
    {
      type: 'mife',
      serverPort: 3002,
      spaEntryPoints: ['src/main.tsx']
    }
  )],
})
