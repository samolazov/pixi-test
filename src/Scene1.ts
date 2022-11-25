import { Sprite } from "pixi.js";
import { app, menu } from "./index";
import { SceneBase } from "./SceneBase";

export class Scene1 extends SceneBase {
    private t: ReturnType<typeof setTimeout>;

    private readonly deckAmount: number = 144;

    private readonly cardHeight: number = 70;
    private readonly cardOffset: number = 5;
    private readonly cardWidth: number = 50;
    private readonly fullDeckWidth: number = this.cardOffset * (this.deckAmount - 1) + this.cardWidth;
    private readonly sceneOffset: number = 10;

    constructor() {
        super("Cards");
    }

    public hide() {
        super.hide();
        clearTimeout(this.t);
    }

    protected buildScene(): void {
        for (let i = 0; i < this.deckAmount; i++) {
            const card = this.createCard(i);
            this.container.addChild(card);
        }
        this.container.x = this.sceneOffset;
        this.container.y = menu.topSafeArea;
        this.adjustContainer();
        app.renderer.on("resize", this.adjustContainer, this);
        this.animate();
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

    private async animate(): Promise<void> {
        for (let i = this.deckAmount - 1; i >= 0; i--) {
            await new Promise(resolve => {
                this.t = setTimeout(resolve, 1000);
            });
            this.moveCard(i);
        }
    }

    private createCard(i: number): Sprite {
        const card = Sprite.from("assets/card.png");
        card.height = this.cardHeight;
        card.width = this.cardWidth;
        card.x = i * this.cardOffset;
        return card;
    }

    private moveCard(i: number): void {
        if (!this.t) {
            return;
        }
        console.log(i);
    }
}
