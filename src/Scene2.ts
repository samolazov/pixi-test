import { Graphics } from "pixi.js";
import { SceneBase } from "./SceneBase";

export class Scene2 extends SceneBase {
    constructor() {
        super("Random");
    }

    protected buildScene(): void {
        const circle = new Graphics();
        circle.beginFill(0xdddddd);
        circle.drawCircle(0, 0, 32);
        circle.endFill();
        circle.x = 64;
        circle.y = 130;
        this.container.addChild(circle);
    }
}
