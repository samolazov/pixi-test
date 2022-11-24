import { Sprite } from "pixi.js";
import { app, menu } from "./index";
import { SceneBase } from "./SceneBase";

export class Scene1 extends SceneBase {
    private readonly cardHeight: number = 70;
    private readonly cardOffset: number = 5;
    private readonly cardWidth: number = 50;
    private readonly deckNumber: number = 144;
    private readonly fullDeckWidth: number = this.cardOffset * (this.deckNumber - 1) + this.cardWidth;
    private readonly sceneOffset: number = 10;

    constructor() {
        super("Cards");
    }

    protected buildScene(): void {
        for (let i = 0; i < this.deckNumber; i++) {
            const card = this.createCard(i);
            this.container.addChild(card);
        }
        this.container.x = this.sceneOffset;
        this.container.y = menu.topSafeArea;
        this.adjustContainer();
        app.renderer.on("resize", this.adjustContainer, this);
    }

    private adjustContainer(): void {
        let visibleArea: number;
        let multiplier = 1;
        const { innerHeight, innerWidth } = window;
        const portrait = innerHeight > innerWidth;
        if (portrait) {
            visibleArea = innerHeight - menu.topSafeArea - this.sceneOffset;
            this.container.angle = 90;
            multiplier = -1;
        } else {
            visibleArea = innerWidth - this.sceneOffset * 2;
            this.container.angle = 0;
        }
        const scale = visibleArea / this.fullDeckWidth;
        this.container.scale = { x: scale, y: scale * multiplier };
    }

    private createCard(i: number): Sprite {
        const card = Sprite.from("assets/card.png");
        card.height = this.cardHeight;
        card.width = this.cardWidth;
        card.x = i * this.cardOffset;
        return card;
    }
}
