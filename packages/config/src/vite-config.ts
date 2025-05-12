import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import externalize from 'vite-plugin-externalize-dependencies';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import { mifeExternalDependencies, rootExternalDependencies } from './external-dependencies.js';

type Options = {
  isRoot?: boolean;
  isReact?: boolean;
};

export const viteConfigMife = (port: number, { isRoot = false, isReact = false }: Options = {}) =>
  defineConfig({
    server: {
      port,
      hmr: process.env.HMR === '1',
    },
    preview: {
      port,
    },
    plugins: [
      externalize({
        externals: isRoot ? rootExternalDependencies : mifeExternalDependencies,
      }),
      ...(isRoot
        ? []
        : [
            vitePluginSingleSpa({
              type: 'mife',
              serverPort: port,
              spaEntryPoints: [`src/spa${isReact ? '.tsx' : '.ts'}`],
            }),
          ]),
      cssInjectedByJsPlugin(),
    ],
    publicDir: '../../public',
    build: {
      emptyOutDir: true,
      rollupOptions: {
        external: isRoot ? rootExternalDependencies : mifeExternalDependencies,
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
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    },
  });
