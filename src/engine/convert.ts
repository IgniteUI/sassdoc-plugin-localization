import * as extras from 'sassdoc-extras';

import { Preprocess } from "../utils/preprocess";
import { ConvertOperations } from "../utils/convert-operations";

export function convert (data, directoryPath) {
    const groupedData = extras.byGroupAndType(data);
    const keys = Object.keys(groupedData);
    
    Preprocess.buildHierarchy(groupedData, directoryPath);
    ConvertOperations.buildJsons(groupedData, directoryPath);
}