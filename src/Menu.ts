import { app } from "./index";
import { FpsMeter } from "./FpsMeter";
import { SceneBase } from "./SceneBase";
import { Graphics, Text } from "pixi.js";

interface IMenuItem {
    active: boolean;
    scene: SceneBase;
    text: Text;
}

export class Menu {
    private readonly container;
    private readonly items: IMenuItem[] = [];
    private readonly textActive: string = "0xaaaaaa";
    private readonly textIdle: string = "0x555555";

    constructor() {
        this.container = new Graphics();
        this.container.beginFill(0x000000);
        this.container.drawRect(0, 0, window.innerWidth, 40);
        this.container.endFill();
        this.container.zIndex = 10;
        this.container.addChild(new FpsMeter().element);
        app.stage.addChild(this.container);
    }

    public add(scene: SceneBase): void {
        const text = new Text(scene.name, {
            fontFamily: "Arial",
            fontSize: 16,
            fill: this.textIdle,
            align: "center",
        });
        text.interactive = true;
        text.x = this.items.reduce((acc, i) => acc + i.text.width + 10, 100);
        text.y = 10;
        const item: IMenuItem = { active: false, scene, text };
        this.items.push(item);
        const id = this.items.length - 1;
        text.on("click", () => this.activate(id));
        text.on("mouseenter", () => this.onItemEnter(item));
        text.on("mouseleave", () => this.onItemLeave(item));
        this.container.addChild(text);
    }

    public activate(i: number): void {
        for (const item of this.items) {
            this.deactivate(item);
        }
        const item = this.items[i];
        item.active = true;
        item.scene.show();
        item.text.style.fill = this.textActive;
    }

    private deactivate(item: IMenuItem): void {
        item.active = false;
        item.scene.hide();
        item.text.style.fill = this.textIdle;
    }

    private onItemEnter({ active, text }: IMenuItem): void {
        if (!active) {
            text.style.fill = this.textActive;
            text.cursor = "pointer";
        }
    }

    private onItemLeave({ active, text }: IMenuItem): void {
        if (!active) {
            text.style.fill = this.textIdle;
            text.cursor = "default";
        }
    }
}
