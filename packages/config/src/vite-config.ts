import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import externalize from 'vite-plugin-externalize-dependencies';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import { mifeExternalDependencies, rootExternalDependencies } from './external-dependencies.js';

type Options = {
  isRoot?: boolean;
  isReact?: boolean;
};

const isRunningSingleApp = process.env.RUNNING_SINGLE_APP === '1';

export const viteConfigMife = (port: number, { isRoot = false, isReact = false }: Options = {}) => {
  const externalDependencies = isRoot ? rootExternalDependencies : isRunningSingleApp ? [] : mifeExternalDependencies;

  return defineConfig({
    server: {
      port,
      hmr: isRunningSingleApp,
    },
    preview: {
      port,
    },
    plugins: [
      externalize({
        externals: externalDependencies,
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
      ...(isRunningSingleApp ? [tailwindcss()] : []),
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
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    },
  });
};
