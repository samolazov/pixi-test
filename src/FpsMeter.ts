import { app } from "./index";
import { Container, ITextStyle, Text } from "pixi.js";

const round = (n: number): number => Math.round(n * 100) / 100;

export class FpsMeter {
    public readonly element: Container;

    private readonly interval = 200; // ms
    private readonly textOptions: Partial<ITextStyle> = {
        fontFamily: "Arial",
        fontSize: 12,
        fill: 0xaaffaa,
        align: "center",
    };

    constructor() {
        this.element = new Container();
        this.buildPixiFps();
        this.buildWinFps();
    }

    private buildPixiFps(): void {
        const counter = new Text("", this.textOptions);
        counter.x = 10;
        counter.y = 6;
        this.element.addChild(counter);
        setInterval(() => (counter.text = `FPS Pixi: ${round(app.ticker.FPS)}`), this.interval);
    }

    private buildWinFps(): void {
        const counter = new Text("", this.textOptions);
        counter.x = 10;
        counter.y = 20;
        this.element.addChild(counter);

        let fps: number;
        let before = Date.now();
        requestAnimationFrame(function loop() {
            const now = Date.now();
            fps = 1000 / (now - before);
            before = now;
            requestAnimationFrame(loop);
        });
        setInterval(() => (counter.text = `FPS Window: ${round(fps)}`), this.interval);
    }
}
