import { viteConfig } from '@sjoerdvanbommel-packages/config';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';
import { defineConfig, mergeConfig } from 'vite';

dotenv.config({ path: ['../../.env', '.env'] });

export default mergeConfig(
  viteConfig(3003),
  defineConfig({
    plugins: [vue()],
  }),
);
