import { app } from "./index";
import { Text } from "pixi.js";

export class FpsMeter {
    constructor() {
        const meter = new Text(this.text, {
            fontFamily: 'Arial',
            fontSize: 16,
            fill: 0xaaffaa,
            align: 'center',
        });
        setInterval(() => meter.text = this.text, 200);
        app.stage.addChild(meter);
    }

    private get text(): string {
        return `FPS: ${Math.round(app.ticker.FPS * 100) / 100}`;
    }
}
