import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import externalize from 'vite-plugin-externalize-dependencies';
import { externalDependencies } from './external-dependencies.js';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

type Options = {
  isRoot?: boolean,
  isReact?: boolean
}

export const viteConfigMife = (port: number, { isRoot = false, isReact = false }: Options = {}) => defineConfig({
    server: {
      port,
        hmr: process.env.HMR === '1'
    },
    preview: {
      port,
    },
    plugins: [
      tailwindcss(),
      ...(isRoot ? [] : [externalize({ externals: externalDependencies }), vitePluginSingleSpa(
        {
          type: 'mife',
          serverPort: port,
          spaEntryPoints: [`src/spa${isReact ? '.tsx' : '.ts'}`]
        }
      )]),
    ],
    publicDir: '../../public',
    build: {
      emptyOutDir: true,
      rollupOptions: {
        external: isRoot ? [] : externalDependencies,
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

  