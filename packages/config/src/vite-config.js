import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import externalize from 'vite-plugin-externalize-dependencies';
import { externalDependencies } from './external-dependencies.js';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

export const viteConfigMife = (port, isRoot = false) => defineConfig({
    server: {
      port,
        hmr: process.env.HMR === '1'
    },
    plugins: [
      tailwindcss(),
      externalize({ externals: externalDependencies }),
      ...(!isRoot ? [vitePluginSingleSpa(
        {
          type: 'mife',
          serverPort: port,
          spaEntryPoints: ['src/main.tsx']
        }
      )] : []),
    ],
    publicDir: '../../public',
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

  