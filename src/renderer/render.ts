import * as extras from 'sassdoc-extras';

import { RenderOperations } from "./render-operations";

export function render(data, directoryPath) {
    const groupedData = extras.byGroupAndType(data);
    
    const renderOperations = new RenderOperations();
    renderOperations.localizaData(groupedData, directoryPath);
}