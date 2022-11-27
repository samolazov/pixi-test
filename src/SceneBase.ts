import { app, menu } from "./index";
import { Container } from "pixi.js";

export abstract class SceneBase {
    protected readonly container = new Container();

    protected constructor(public readonly name: string) {
        menu.add(this);
        this.hide = this.hide.bind(this);
        this.show = this.show.bind(this);
    }

    public hide(): void {
        app.renderer.off("resize", this.onResize, this);
        app.stage.removeChild(this.container);
        this.container.removeChildren();
    }

    public show(): void {
        this.buildScene();
        app.stage.addChild(this.container);
        app.renderer.on("resize", this.onResize, this);
    }

    protected onResize(): void {}

    protected abstract buildScene(): void;
}
