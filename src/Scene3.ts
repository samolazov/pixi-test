import { app } from "./index";
import { SceneBase } from "./SceneBase";
import { BLEND_MODES, Sprite } from "pixi.js";

interface ITransform {
    alpha: number;
    scaleY: number;
    skewX: number;
    time: number;
}

export class Scene3 extends SceneBase {
    private enabled: boolean = true;
    private t: ReturnType<typeof setTimeout>;

    private readonly offset: number = 50;
    private readonly spurtHeight: number = 600;
    private readonly spurtWidth: number = 500;

    constructor() {
        super("Fire");
    }

    public hide() {
        this.enabled = false;
        super.hide();
        clearTimeout(this.t);
    }

    public show() {
        this.enabled = true;
        super.show();
    }

    protected buildScene(): void {
        for (let i = 0; i < 5; i++) {
            const spurt = this.createSpurt(i);
            this.container.addChild(spurt);
        }
        this.container.pivot = { x: window.innerWidth / 2, y: window.innerHeight };
        this.onResize();
    }

    protected createSpurt(i: number): Sprite {
        const spurt = Sprite.from("assets/fire.png");
        const sizeCorrection = 1 - i / 8;
        const xCorrection = 1 - ((i % 2 ? 1 : -1) * i) / 15;
        spurt.height = this.spurtHeight * sizeCorrection;
        spurt.width = this.spurtWidth * sizeCorrection;
        spurt.pivot = { x: this.spurtWidth / 2, y: this.spurtHeight };
        spurt.x = (window.innerWidth * xCorrection) / 2;
        spurt.y = window.innerHeight;
        spurt.blendMode = BLEND_MODES.ADD;
        this.animate(spurt);
        return spurt;
    }

    protected onResize(): void {
        this.container.x = window.innerWidth / 2;
        this.container.y = window.innerHeight + this.offset;
    }

    private animate(spurt: Sprite): void {
        if (!this.enabled) {
            return;
        }
        const t = this.transform;
        const expectedFrames = (t.time / 1000) * app.ticker.FPS;
        const alpha = (1 - t.alpha) / expectedFrames;
        const scaleY = t.scaleY / expectedFrames;
        const skewX = t.skewX / expectedFrames;
        const handler = () => {
            spurt.alpha -= alpha;
            spurt.scale.y += scaleY;
            spurt.skew.x += skewX;
        };
        app.ticker.add(handler);
        this.t = setTimeout(() => {
            app.ticker.remove(handler);
            spurt.alpha = 1;
            spurt.scale.y = 0.2;
            spurt.skew.x = 0;
            this.animate(spurt);
        }, t.time);
    }

    private get transform(): ITransform {
        return {
            alpha: Math.random() * 0.5 + 0.5, // 0.5...1
            scaleY: Math.random() * 0.4 + 0.8, // 0.8...1.2
            skewX: Math.random() * 0.2 - 0.1, // -0.1...0.1
            time: Math.random() * 500, // 0...500 ms
        };
    }
}
