import { Text } from "pixi.js";
import { app, menu } from "./index";
import { SceneBase } from "./SceneBase";
import { emojis, sentences } from "./dictionary";

export class Scene2 extends SceneBase {
    private readonly fontSizeDefault: number = 48;
    private readonly fontSizeDelta: number = 32;
    private readonly fontSizeMin: number = 16;
    private readonly sceneOffset: number = 10;

    private i: NodeJS.Timer;

    constructor() {
        super("Random");
    }

    public hide(): void {
        super.hide();
        clearInterval(this.i);
    }

    public show(): void {
        super.show();
        this.i = setInterval(() => {
            this.container.removeChildren();
            this.buildScene();
        }, 2000);
    }

    protected buildScene(): void {
        let hasEmoji: boolean = false;
        for (let i = 0; i < 3; i++) {
            let fontSize: number = this.fontSizeDefault;
            let text: string;
            const random = Math.round(Math.random());
            if (hasEmoji || random) {
                text = this.getText(sentences);
                fontSize = Math.round(Math.random() * this.fontSizeDelta) + this.fontSizeMin;
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
            wordWrapWidth: app.stage.width - this.sceneOffset * 2,
        });
        element.y = this.container.height + menu.topSafeArea;
        element.x = this.sceneOffset;
        this.container.addChild(element);
    }

    private getText(dict: string[]): string {
        const n = Math.floor(Math.random() * dict.length);
        return dict[n];
    }
}
