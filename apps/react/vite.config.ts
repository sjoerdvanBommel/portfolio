import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import dotenv from 'dotenv'
import tailwindcss from '@tailwindcss/vite';
import { resolve } from 'path';
import externalize from 'vite-plugin-externalize-dependencies';
import { externalDependencies } from '@sjoerdvanbommel-packages/config'

dotenv.config({ path: ['../../.env', '.env'] })

export default defineConfig({
  server: {
    port: 3002,
    hmr: process.env.HMR === '1'
  },
  publicDir: resolve(__dirname, '../../public'),
  plugins: [react(),
    tailwindcss(), vitePluginSingleSpa(
    {
      type: 'mife',
      serverPort: 3002,
      spaEntryPoints: ['src/main.tsx'],
    }
  ),
  externalize({ externals: externalDependencies }),
],
build: {
  emptyOutDir: true,
  rollupOptions: {
    external: externalDependencies,
    output: {
      entryFileNames: '[name].js',
      chunkFileNames: '[name]-[hash].js',
    },
  },
},
})
