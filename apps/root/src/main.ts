import { registerApplication, start } from "single-spa";

[
    { name: 'header', activeWhen: () => true },
    { name: 'react'},
    { name: 'svelte'},
    { name: 'about', activeWhen: '/about'},
    { name: 'blog', activeWhen: '/blog'}
].forEach((module) => {
    registerApplication({
        name: module.name,
        app: () => import(/* @vite-ignore */ `portfolio-${module.name}`),
        activeWhen: module.activeWhen ?? ((route) => route.pathname === '/' || route.pathname.startsWith(`/${module.name}`)),
        customProps: {
            domElementGetter: () => document.getElementById(`${module.name}-app`)
        }
    });
});

start();

