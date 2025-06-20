import path from 'path';

import { Constants } from '../utils/constants.js';
import { Common } from '../utils/common.js';
import { FileOperations } from '../utils/file-operations.js';

export class ConvertOperations {

    constructor() { }

    /**
     * Recursively finds all sass declarations associated with the corresponding group.
     * 
     * @param groupedData sorted data by group
     * @param fullPath directory to export
     */
    public writeJsonsData(groupedData: object, fullPath: string) {
        if (Array.isArray(groupedData)) {
            this.writeToFileJson(groupedData, fullPath);
            return;
        }

        const keys = Object.keys(groupedData);
        keys.forEach(key => {
            this.writeJsonsData(groupedData[key], fullPath);
        });
    }

    /**
     * Iterates through the all sass declarations per every group.
     * 
     * @param data data per gorup
     * @param fullPath path to export
     */
    private writeToFileJson(data: Array<any>, fullPath: string) {
        let json = {};
        data.forEach(e => {
            const data = this.dataProcessing(e);
            if (data) {
                json[e.context.name] = data;
                const filePath = path.join(fullPath, e.group[0], e.context.type);
                FileOperations.writeToJson(filePath, json);
            }
        });
    }

    /**
     * Constructs the josn object representation per sass declration.
     * 
     * @param fileData every sass declaration.
     * @returns json object|null
     */
    private dataProcessing(fileData) {
        const res = {};
    
        if (fileData.description) {
            res[Constants.DESCRIPTION] = Common.splitString(fileData.description);
        }

        if (fileData.parameter && fileData.parameter.length) {
            res[Constants.PARAMETERS] = {};
            fileData.parameter.forEach(e => {
                if (e.description) {
                    res[Constants.PARAMETERS][e.name] = {};
                    res[Constants.PARAMETERS][e.name][Constants.DESCRIPTION] = Common.splitString(e.description);
                }
            })
        }

        if(fileData.property && fileData.property.length) {
            res[Constants.PROPERTIES] = {};
            fileData.property.forEach(e => {
                if (e.description) {
                    res[Constants.PROPERTIES][e.name] = {};
                    res[Constants.PROPERTIES][e.name][Constants.DESCRIPTION] = Common.splitString(e.description);
                }
            })
        }

        if (fileData.return) {
            if (fileData.return && fileData.return.description) {
                res[Constants.RETURNS] = {};
                res[Constants.RETURNS][Constants.DESCRIPTION] = Common.splitString(fileData.return.description);
            }
        }

        // if (fileData.type) {
        //     res[Constants.TYPE] = fileData.type;
        // }

        
        if (fileData.example) {
            const exampleJson = fileData.example.map(e => ({
                description: Common.splitString(e.description),
                code: Common.splitString(e.code)
            }));
            
            res[Constants.EXAMPLE] = exampleJson;
        }

        return Object.keys(res).length ? res : null
    }
}
