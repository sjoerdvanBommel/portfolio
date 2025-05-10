import { defineConfig } from 'vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import dotenv from 'dotenv'
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue'

dotenv.config({ path: ['../../.env', '.env'] })

export default defineConfig({
  server: {
    port: 3003,
    hmr: process.env.HMR === '1'
  },
  publicDir: resolve(__dirname, '../../public'),
  plugins: [vue(),
    tailwindcss(), vitePluginSingleSpa(
    {
      type: 'mife',
      serverPort: 3003,
      spaEntryPoints: ['src/main.ts']
    }
  )],
  define: {
    // enable hydration mismatch details in production build
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  }
})
