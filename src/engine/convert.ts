import * as extras from 'sassdoc-extras';

import { Preprocess } from "../utils/preprocess";
import { ConvertOperations } from "../utils/convert-operations";

export function convert (data, directoryPath) {
    const groupedData = extras.byGroupAndType(data);
    
    Preprocess.buildJsonsHierarchy(groupedData, directoryPath);

    const convertOperations = new ConvertOperations();
    convertOperations.writeJsonsData(groupedData, directoryPath);
}