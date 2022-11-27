import { app } from "./index";
import { Text } from "pixi.js";

const getText = (n: number): string => `FPS: ${Math.round(n * 100) / 100}`;

export class FpsMeter {
    public element: Text;

    constructor() {
        this.create();
        this.run();
    }

    private create(): void {
        this.element = new Text(getText(app.ticker.FPS), {
            fontFamily: "Arial",
            fontSize: 16,
            fill: 0xaaffaa,
            align: "center",
        });
        this.element.x = 10;
        this.element.y = 10;
    }

    private run(): void {
        let fps: number;
        let before = Date.now();
        requestAnimationFrame(function loop() {
            const now = Date.now();
            fps = 1000 / (now - before);
            before = now;
            requestAnimationFrame(loop);
        });
        setInterval(() => (this.element.text = getText(fps)), 200);
    }
}
