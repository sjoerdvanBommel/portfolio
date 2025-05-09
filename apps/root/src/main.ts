import { registerApplication, start } from "single-spa";

[
    {
        name: 'root',
        port: 3000
    },
    {
        name: 'header',
        port: 3001
    },
    {
        name: 'react',
        port: 3002
    },
    {
        name: 'svelte',
        port: 3003
    }
].filter(app => app.name !== 'root').forEach((module) => {
    registerApplication({
        name: module.name,
        app: () => import(/* @vite-ignore */ `portfolio-${module.name}`),
        activeWhen: (route) => route.pathname === '/' || route.pathname.startsWith(`/${module.name}`),
        customProps: {
            domElementGetter: () => document.getElementById(`${module.name}-app`)
        }
    });
});

start();

