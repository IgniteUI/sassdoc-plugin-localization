import extras from 'sassdoc-extras';

import { Preprocess } from "../utils/preprocess.js";
import { ConvertOperations } from "./convert-operations.js";

export function convert (data: object, directoryPath: string) {
    const groupedData = extras.byGroupAndType(data);
    
    Preprocess.buildJsonsHierarchy(groupedData, directoryPath);

    const convertOperations = new ConvertOperations();
    convertOperations.writeJsonsData(groupedData, directoryPath);
}
