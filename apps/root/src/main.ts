import { registerApplication, start } from "single-spa";

const reactModule = 'portfolio-react';
const svelteModule = 'portfolio-svelte';

registerApplication({
    name: 'react',
    app: () => import(/* @vite-ignore */ reactModule),
    activeWhen: '/react'
});

registerApplication({
    name: 'svelte',
    app: () => import(/* @vite-ignore */ svelteModule),
    activeWhen: '/svelte'
});

start();
