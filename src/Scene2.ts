import { menu } from "./index";
import { Graphics } from "pixi.js";
import { SceneBase } from "./SceneBase";

export class Scene2 extends SceneBase {
    public readonly name: string = "Random";

    constructor() {
        super();
        menu.add(this);
    }

    protected buildScene(): void {
        const circle = new Graphics();
        circle.beginFill(0xdddddd);
        circle.drawCircle(0, 0, 32);
        circle.endFill();
        circle.x = 64;
        circle.y = 130;
        this.container.addChild(circle);
    };
}
