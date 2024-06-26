import { Container, Sprite, Ticker } from "pixi.js";
import { tickerDecorator } from "../../decorators";
import { GameWindowManager } from "../../managers";
import { TickerFadeAlphaProps } from "../../types/ticker/TickerFadeAlphaProps";
import TickerBase from "./TickerBase";

/**
 * A ticker that fades the alpha of the canvas element of the canvas.
 * @example
 * ```typescript
 * let bunny = addImage("bunny1", "https://pixijs.com/assets/eggHead.png")
 * await bunny.load()
 * GameWindowManager.addCanvasElement("bunny", bunny);
 * // ...
 * const ticker = new TickerFadeAlpha({
 *     speed: 0.01,
 *     type: "hide",
 * }),
 * GameWindowManager.addTicker("bunny", ticker)
 * ```
 */
@tickerDecorator()
export default class TickerFadeAlpha extends TickerBase<TickerFadeAlphaProps> {
    /**
     * The method that will be called every frame to fade the alpha of the canvas element of the canvas.
     * @param delta The delta time
     * @param args The arguments that are passed to the ticker
     * @param tags The tags of the canvas element that are connected to this ticker
     */
    override fn(
        t: Ticker,
        args: TickerFadeAlphaProps,
        tags: string[]
    ): void {
        let type = args.type === undefined ? "hide" : args.type
        let speed = args.speed === undefined ? 0.1 : args.speed
        let limit = args.limit === undefined ? type === "hide" ? 0 : 1 : args.limit
        let removeElementAfter = args.tagToRemoveAfter || []
        if (typeof removeElementAfter === "string") {
            removeElementAfter = [removeElementAfter]
        }
        if (type === "hide" && limit < 0) {
            limit = 0
        }
        if (type === "show" && limit > 1) {
            limit = 1
        }
        tags
            .filter((tag) => {
                let element = GameWindowManager.getCanvasElement(tag)
                if (args.startOnlyIfHaveTexture) {
                    if (element && element instanceof Sprite && element.texture?.label == "EMPTY") {
                        return false
                    }
                }
                return true
            })
            .forEach((tag) => {
                let element = GameWindowManager.getCanvasElement(tag)
                if (element && element instanceof Container) {
                    if (type === "show" && element.alpha < limit) {
                        element.alpha += speed * t.deltaTime
                    }
                    else if (type === "hide" && element.alpha > limit) {
                        element.alpha -= speed * t.deltaTime
                    }
                    else {
                        element.alpha = limit
                        GameWindowManager.removeAssociationBetweenTickerCanvasElement(tag, this)
                        GameWindowManager.removeCanvasElement(removeElementAfter)
                    }
                }
            })
    }
}
