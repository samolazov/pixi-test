import { menu } from "./index";
import { Graphics } from "pixi.js";
import { SceneBase } from "./SceneBase";

export class Scene1 extends SceneBase {
    public readonly name: string = "Cards";

    constructor() {
        super();
        menu.add(this);
    }

    protected buildScene(): void {
        const rectangle = new Graphics();
        rectangle.lineStyle({ width: 4, color: 0xFF3300, alpha: 1 });
        rectangle.beginFill(0x66CCFF);
        rectangle.drawRect(0, 0, 64, 64);
        rectangle.endFill();
        rectangle.x = 170;
        rectangle.y = 170;
        this.container.addChild(rectangle);
    };
}
