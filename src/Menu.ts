import {Graphics} from "pixi.js";
import {Application} from "@pixi/app/lib/Application";

export class Menu {
    constructor(private readonly app: Application) {
        const circle = new Graphics();
        circle.beginFill(0xdddddd);
        circle.drawCircle(0, 0, 32);
        circle.endFill();
        circle.x = 64;
        circle.y = 130;
        app.stage.addChild(circle);
    }
}
