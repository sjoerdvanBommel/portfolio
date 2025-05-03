import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export default defineConfig({
  server: {
    port: 3001,
    hmr: false
  },
  plugins: [react(), vitePluginSingleSpa(
    {
      type: 'mife',
      serverPort: 3001,
      spaEntryPoints: ['src/main.tsx']
    }
  )],
})
