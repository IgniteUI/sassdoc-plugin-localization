import { byGroupAndType } from "../utils/groupData.js";
import { Preprocess } from "../utils/preprocess.js";
import { ConvertOperations } from "./convert-operations.js";

export function convert(data: Array<any>, directoryPath: string) {
  const groupedData = byGroupAndType(data);

  Preprocess.buildJsonsHierarchy(groupedData, directoryPath);

  const convertOperations = new ConvertOperations();
  convertOperations.writeJsonsData(groupedData, directoryPath);
}
