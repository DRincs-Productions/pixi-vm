import { getLabelById } from "../decorators"
import { Close, CloseType, LabelRunModeType, StorageObjectType } from "../types"
import { LabelIdType } from "../types/LabelIdType"
import newCloseLabel from "./CloseLabel"
import Label from "./Label"

/**
 * ChoiceMenuOption is a class that contains a Label and a text that will be displayed in the menu.
 * @example
 * ```typescript
 * new ChoiceMenuOption("Hello", HelloLabel)
 * ```
 */
export default class ChoiceMenuOption<T extends StorageObjectType> {
    /**
     * Text to be displayed in the menu
     */
    text: string
    /**
     * Label to be opened when the option is selected
     */
    label: Label<T>
    /**
     * Type of the label to be opened
     */
    type: LabelRunModeType
    /**
     * Properties to be passed to the label
     */
    props: StorageObjectType = {}
    /**
     * @param text Text to be displayed in the menu
     * @param label Label to be opened when the option is selected or the id of the label
     * @param type Type of the label to be opened. @default "call"
     * @param props Properties to be passed to the label, when the label is called. it cannot contain functions or classes. @default {}
     */
    constructor(text: string, label: Label<T> | LabelIdType, type: LabelRunModeType = "call", props?: T) {
        if (typeof label === 'string') {
            let tLabel = getLabelById(label)
            if (!tLabel) {
                throw new Error(`[Pixi'VN] Label ${label} not found`)
            }
            else {
                label = tLabel
            }
        }
        this.text = text
        this.label = label
        this.type = type
        if (props) {
            this.props = props
        }
    }
}

/**
 * ChoiceMenuOptionClose is a class that contains a text that will be displayed in the menu.
 * It is used to close the menu.
 * @example
 * ```typescript
 * new ChoiceMenuOptionClose("Return")
 * ```
 */
export class ChoiceMenuOptionClose {
    /**
     * Label to be opened when the option is selected
     */
    label: Label = newCloseLabel()
    /**
     * Text to be displayed in the menu
     */
    text: string
    /**
     * Type of the label to be opened
     */
    type: CloseType = Close
    /**
     * Properties to be passed to the label
     */
    props: StorageObjectType = {}
    /**
     * @param text Text to be displayed in the menu
     */
    constructor(text: string) {
        this.text = text
    }
}

export type IStoratedChoiceMenuOption = {
    text: string
    label: LabelIdType
    type: LabelRunModeType
    props: StorageObjectType
} | {
    text: string
    type: CloseType
}

/**
 * HistoryChoiceMenuOption is a type that contains the history information of a choice menu option.
 */
export type HistoryChoiceMenuOption = {
    /**
     * Text to be displayed in the menu
     */
    text: string
    /**
     * Method used to open the label, or close the menu.
     */
    type: CloseType | LabelRunModeType
    /**
     * This choice is a response
     */
    isResponse: boolean
}
