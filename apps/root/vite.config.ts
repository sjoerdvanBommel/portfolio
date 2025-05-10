import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite'
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import externalize from 'vite-plugin-externalize-dependencies';
import { externalDependencies } from '@sjoerdvanbommel-packages/config'

export default defineConfig({
  server: {
    port: 3000,
  },
  publicDir: false,
  plugins: [
    tailwindcss(),
    vitePluginSingleSpa({
      type: 'root',
      importMaps: {
        dev: 'src/importMap.dev.json',
        build: 'src/importMap.json'
      },
    }),
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
  define: {
    // enable hydration mismatch details in production build
    __VUE_OPTIONS_API__: 'false',
    __VUE_PROD_DEVTOOLS__: 'false',
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false'
  },
})
