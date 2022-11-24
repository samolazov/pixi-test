import { Graphics } from "pixi.js";
import { SceneBase } from "./SceneBase";

export class Scene1 extends SceneBase {
    constructor() {
        super("Cards");
    }

    protected buildScene(): void {
        const padding = 40;
        const rectangle = new Graphics();
        rectangle.beginFill(0x333333);
        rectangle.drawRect(0, padding, window.innerWidth, window.innerHeight - padding);
        rectangle.endFill();
        this.container.addChild(rectangle);
    }
}
