import { menu } from "./index";
import { SceneBase } from "./SceneBase";

export class Scene3 extends SceneBase {
    public readonly name: string = "Fire";

    constructor() {
        super();
        menu.add(this);
    }

    protected buildScene(): void {
    };
}
