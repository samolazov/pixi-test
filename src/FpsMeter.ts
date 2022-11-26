import { app } from "./index";
import { Text } from "pixi.js";

export class FpsMeter {
    public readonly element: Text;

    constructor() {
        this.element = new Text(this.text, {
            fontFamily: "Arial",
            fontSize: 16,
            fill: 0xaaffaa,
            align: "center",
        });
        this.element.x = 10;
        this.element.y = 10;
        setInterval(() => (this.element.text = this.text), 100);
    }

    private get text(): string {
        return `FPS: ${Math.round(app.ticker.FPS * 100) / 100}`;
    }
}
