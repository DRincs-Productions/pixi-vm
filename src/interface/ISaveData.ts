import ExportedCanvas from "./export/ExportedCanvas"
import ExportedStep from "./export/ExportedStep"
import ExportedStorage from "./export/ExportedStorage"

export default interface ISaveData {
    pixivn_version: string
    stepData: ExportedStep
    storageData: ExportedStorage
    canvasData: ExportedCanvas
    path: string
}