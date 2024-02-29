import { Container } from "pixi.js";
import { getImageSprite, getImageSpriteAsync } from "../../functions/ImageUtility";
import { ICanvasImageMemory } from "../../interface/canvas/ICanvasImageMemory";
import { CanvasContainerBase } from "./CanvasContainer";

/**
 * The base class for the image.
 */
abstract class CanvasImageBase extends CanvasContainerBase<Container, ICanvasImageMemory> {
    imageLink: string
    constructor(image: string) {
        let container = new Container()
        super(container)
        this.imageLink = image
        this.updateImage(image)
    }
    /**
     * Update the image of the element.
     * @param image is the url of the image.
     */
    abstract updateImage(image: string): void
    get memory(): ICanvasImageMemory {
        return {
            ...super.memoryContainer,
            imageLink: this.imageLink,
        }
    }
    abstract get className(): string
    set memory(value: ICanvasImageMemory) {
        super.memoryContainer = value
        this.updateImage(value.imageLink)
    }
}

/**
 * The class for the image.
 */
export class CanvasImage extends CanvasImageBase {
    get className(): string {
        return this.constructor.name
    }
    updateImage(image: string) {
        this.imageLink = image
        let element = getImageSprite(image)
        this.addChild(element)
    }
}

/**
 * The class for the image, but asynchronously.
 */
export class CanvasImageAsync extends CanvasImageBase {
    get className(): string {
        return this.constructor.name
    }
    updateImage(image: string): void {
        this.imageLink = image
        getImageSpriteAsync(image)
            .then((element) => {
                this.addChild(element)
            })
            .catch(() => {
                console.error("Error loading image")
            })
    }
}
