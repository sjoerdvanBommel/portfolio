import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import externalize from 'vite-plugin-externalize-dependencies';
import vitePluginSingleSpa from 'vite-plugin-single-spa';
import { mifeExternalDependencies, rootExternalDependencies } from './external-dependencies';

type Options = {
  isRoot?: boolean;
  isReact?: boolean;
};

export const viteConfig = (port: number, { isRoot = false, isReact = false }: Options = {}) => {
  const isRunningSingleApp = process.env.VITE_RUNNING_SINGLE_APP === '1';
  const externalDependencies = isRoot ? rootExternalDependencies : isRunningSingleApp ? [] : mifeExternalDependencies;

  const plugins = [
    externalize({
      externals: externalDependencies,
    }),
    cssInjectedByJsPlugin(),
  ];

  if (isRoot || !isRunningSingleApp) {
    plugins.push(
      vitePluginSingleSpa({
        type: 'mife',
        serverPort: port,
        spaEntryPoints: [`src/spa${isReact ? '.tsx' : '.ts'}`],
      }),
    );
  }

  if (isRoot || isRunningSingleApp) {
    plugins.push(tailwindcss());
  }

  return defineConfig({
    server: {
      port,
      hmr: isRunningSingleApp,
    },
    preview: {
      port,
    },
    plugins,
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
