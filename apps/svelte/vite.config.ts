import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import dotenv from 'dotenv'
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';

dotenv.config({ path: ['../../.env', '.env'] })

export default defineConfig({
  server: {
    port: 3003,
    hmr: process.env.HMR === '1'
  },
  publicDir: resolve(__dirname, '../../public'),
  plugins: [svelte(), 
    tailwindcss(),
    vitePluginSingleSpa(
    {
      type: 'mife',
      serverPort: 3003,
      spaEntryPoints: ['src/main.tsx']
    }
  )],
})
