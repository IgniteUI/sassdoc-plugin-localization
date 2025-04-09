import extras from 'sassdoc-extras';

import { RenderOperations } from "./render-operations.js";

export function render(data, directoryPath: string) {
    const groupedData = extras.byGroupAndType(data);
    
    const renderOperations = new RenderOperations();
    renderOperations.localizeData(groupedData, directoryPath);
}
