import { Menu } from "./Menu";
import { Application, Graphics } from "pixi.js";

const app = new Application({ antialias: true, hello: true });
app.resizeTo = window;
document.body.appendChild(app.view as unknown as HTMLElement);

new Menu(app);

const rectangle = new Graphics();
rectangle.lineStyle({width: 4, color: 0xFF3300, alpha: 1});
rectangle.beginFill(0x66CCFF);
rectangle.drawRect(0, 0, 64, 64);
rectangle.endFill();
rectangle.x = 170;
rectangle.y = 170;
app.stage.addChild(rectangle);
