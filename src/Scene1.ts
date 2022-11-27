import { Sprite } from "pixi.js";
import { app, menu } from "./index";
import { SceneBase } from "./SceneBase";

export class Scene1 extends SceneBase {
    private t: ReturnType<typeof setTimeout>;

    private readonly deckVolume: number = 144;
    private readonly duration: number = 2; // sec
    private readonly frequency: number = 1000; // ms

    private readonly cardHeight: number = 70;
    private readonly cardOffset: number = 5;
    private readonly cardWidth: number = 50;
    private readonly fullDeckWidth: number = this.cardOffset * (this.deckVolume - 1) + this.cardWidth;
    private readonly sceneOffset: number = 10;

    constructor() {
        super("Cards");
        this.container.sortableChildren = true;
    }

    public hide() {
        super.hide();
        clearTimeout(this.t);
    }

    protected buildScene(): void {
        for (let i = 0; i < this.deckVolume; i++) {
            const card = this.createCard(i);
            this.container.addChild(card);
        }
        this.container.x = this.sceneOffset;
        this.container.y = menu.topSafeArea;
        this.onResize();
        this.animate();
    }

    protected onResize(): void {
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
        for (let i = this.deckVolume - 1; i >= 0; i--) {
            await new Promise(resolve => {
                this.t = setTimeout(resolve, this.frequency);
            });
            this.moveCard(i);
        }
    }

    private createCard(i: number): Sprite {
        const card = Sprite.from("assets/card.png");
        card.height = this.cardHeight;
        card.width = this.cardWidth;
        card.x = i * this.cardOffset;
        card.zIndex = i;
        return card;
    }

    private moveCard(i: number): void {
        if (!this.t) {
            return;
        }
        const card = this.container.children[i];
        const indexFromEnd = this.deckVolume - i - 1;
        card.zIndex += indexFromEnd * 2;

        const expectedFrames = this.duration * app.ticker.FPS;
        const xDestination = indexFromEnd * this.cardOffset;
        const yDestination = 100;
        const xDistancePerFrame = (card.x - xDestination) / expectedFrames;
        const yDistancePerFrame = yDestination / expectedFrames;
        const handler = () => {
            if (Math.abs(card.x - xDestination) <= Math.abs(xDistancePerFrame)) {
                card.x = xDestination;
                card.y = yDestination;
                app.ticker.remove(handler);
                return;
            }
            card.x -= xDistancePerFrame;
            card.y += yDistancePerFrame;
        };
        app.ticker.add(handler);
    }
}
