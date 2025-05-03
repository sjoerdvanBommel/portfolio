import { registerApplication, start } from "single-spa";
import { APPS } from "./config";

Object.values(APPS).forEach((module) => {
    registerApplication({
        name: module.name,
        app: () => import(/* @vite-ignore */ module.module),
        activeWhen: module.path
    });
});

start();
