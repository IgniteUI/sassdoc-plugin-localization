import { Preprocess } from "../utils/preprocess";
import { ConvertOperations } from "../utils/convert-operation";

export function convert (data, directoryPath) {
    Preprocess.buildHierarchy(data, directoryPath);

    ConvertOperations.buildJson(data, directoryPath);
}