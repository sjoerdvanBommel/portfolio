import { registerApplication, start } from "single-spa";
import { MODULES } from "./config";

Object.values(MODULES).forEach((module) => {
    registerApplication({
        name: module.name,
        app: () => import(/* @vite-ignore */ module.module),
        activeWhen: module.path
    });
});

start();
