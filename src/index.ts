import { Menu } from "./Menu";
import { Scene1 } from "./Scene1";
import { Scene2 } from "./Scene2";
import { Scene3 } from "./Scene3";
import { Application } from "pixi.js";

export const app = new Application({ antialias: true, hello: true });
app.resizeTo = window;
document.body.appendChild(app.view as unknown as HTMLElement);

export const menu = new Menu();

new Scene1();
new Scene2();
new Scene3();

menu.activate(0);
