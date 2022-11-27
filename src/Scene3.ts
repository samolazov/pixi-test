import { app } from "./index";
import { Sprite } from "pixi.js";
import { SceneBase } from "./SceneBase";

export class Scene3 extends SceneBase {
    private readonly spurtHeight: number = 200;
    private readonly spurtWidth: number = 150;

    constructor() {
        super("Fire");
        // @ts-ignore
        window["fire"] = this.container;
    }

    protected buildScene(): void {
        const spurt = this.createSpurt();
        this.container.addChild(spurt);
        this.container.pivot = { x: this.container.width / 2, y: this.container.height };
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight;
    }

    protected createSpurt(): Sprite {
        const spurt = Sprite.from("assets/fire1.png");
        spurt.height = this.spurtHeight;
        spurt.width = this.spurtWidth;
        return spurt;
    }
}
