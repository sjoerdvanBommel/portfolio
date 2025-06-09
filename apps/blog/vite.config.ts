import mdx from '@mdx-js/rollup';
import { viteConfig } from '@sjoerdvanbommel-packages/config';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';
import { defineConfig, mergeConfig } from 'vite';

dotenv.config({ path: ['../../.env', '.env'] });

export default mergeConfig(
  viteConfig(3005, { isReact: true }),
  defineConfig({
    plugins: [react(), mdx()],
  }),
);
