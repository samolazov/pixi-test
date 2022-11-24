import { app } from "./index";
import { Text } from "pixi.js";
import { SceneBase } from "./SceneBase";
import { emojis, sentences } from "./dictionary";

export class Scene2 extends SceneBase {
    constructor() {
        super("Random");
    }

    protected buildScene(): void {
        this.addNewTexts();
        setInterval(() => {
            this.container.removeChildren();
            this.addNewTexts();
        }, 2000);
    }

    private addNewTexts(): void {
        let hasEmoji: boolean = false;
        for (let i = 0; i < 3; i++) {
            let fontSize: number = 48;
            let text: string;
            const random = Math.round(Math.random());
            if (hasEmoji || random) {
                text = this.getText(sentences);
                fontSize = Math.round(Math.random() * 32) + 16;
            } else {
                text = this.getText(emojis);
                hasEmoji = true;
            }
            this.createElement(text, fontSize);
        }
    }

    private createElement(text: string, fontSize: number): void {
        const element = new Text(text, {
            align: "left",
            fill: "white",
            fontFamily: "Arial",
            fontSize,
            wordWrap: true,
            wordWrapWidth: app.stage.width - 20,
        });
        element.y = this.container.height + 50;
        element.x = 10;
        this.container.addChild(element);
    }

    private getText(dict: string[]): string {
        const n = Math.floor(Math.random() * dict.length);
        return dict[n];
    }
}
