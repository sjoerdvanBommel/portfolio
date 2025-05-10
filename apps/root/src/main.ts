import { registerApplication, start } from "single-spa";

[
    { name: 'header', activeWhen: () => true },
    { name: 'react', activeWhen: '/react'},
    { name: 'home', activeWhen: (location: Location) => location.pathname === '/'},
    { name: 'about', activeWhen: '/about'},
    { name: 'blog', activeWhen: '/blog'}
].forEach((module) => {
    registerApplication({
        name: module.name,
        app: () => import(/* @vite-ignore */ `@sjoerdvanbommel/${module.name}`),
        activeWhen: module.activeWhen,
        customProps: {
            domElementGetter: () => document.getElementById(`${module.name}-app`)
        }
    });
});

start();

