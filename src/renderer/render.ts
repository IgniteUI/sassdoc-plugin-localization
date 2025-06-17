import { byGroupAndType } from "../utils/groupData.js";
import { RenderOperations } from "./render-operations.js";

export function render(data: Array<any>, directoryPath: string) {
    const groupedData = byGroupAndType(data);
    
    const renderOperations = new RenderOperations();
    renderOperations.localizeData(groupedData, directoryPath);
}
