import { app } from "./index";
import { Container } from "pixi.js";

export abstract class SceneBase {
    public readonly name: string;

    protected readonly container = new Container();

    protected constructor() {
        this.buildScene();
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
    }

    public hide(): void {
        app.stage.removeChild(this.container)
    };

    public show(): void {
        app.stage.addChild(this.container);
    };

    protected abstract buildScene(): void;
}
