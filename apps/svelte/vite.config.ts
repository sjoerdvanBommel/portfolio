import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  server: {
    port: 3002,
    hmr: false
  },
  plugins: [svelte(), vitePluginSingleSpa(
    {
      type: 'mife',
      serverPort: 3002,
      spaEntryPoints: ['src/main.tsx']
    }
  )],
})
