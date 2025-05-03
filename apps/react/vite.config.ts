import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import dotenv from 'dotenv'

dotenv.config({ path: ['../../.env', '.env'] })

export default defineConfig({
  server: {
    port: 3001,
    hmr: process.env.HMR === '1'
  },
  plugins: [react(), vitePluginSingleSpa(
    {
      type: 'mife',
      serverPort: 3001,
      spaEntryPoints: ['src/main.tsx']
    }
  )],
})
