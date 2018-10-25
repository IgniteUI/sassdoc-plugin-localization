import * as fs from 'fs';

import { Constants } from "./constants";
import { Common } from "./common";

export class ConvertOperations {

    public static buildJsons(groupedData, fullPath) {
        if (Array.isArray(groupedData)) {
            ConvertOperations.buildJson(groupedData, fullPath);
            return;
        }

        const keys = Object.keys(groupedData);
        keys.forEach(key => {
            ConvertOperations.buildJsons(groupedData[key], fullPath);
        });
    }

    public static buildJson(data, fullPath) {
        let json = {};
        data.forEach(e => {
            const data = ConvertOperations.getData(e);
            if (data) {
                json[e.context.name] = data;
                fs.writeFileSync(`${fullPath}/${e.group[0]}/${e.context.type}.json`, JSON.stringify(json, null, 4));
            }
        });
    }

    private static getData(fileData) {
        const res = {};
    
        if (fileData.description) {
            res[Constants.DESCRIPTION] = Common.splitString(fileData.description);
        }

        if (fileData.parameter && fileData.parameter.length) {
            res[Constants.PARAMETERS] = {}
            fileData.parameter.forEach(e => {
                res[Constants.PARAMETERS][e.name] = {'description': Common.splitString(e.description), 'type': e.type};
            })
        }

        if (fileData.return) {
            const returnObj = fileData.return;
            if (returnObj.description) {
                returnObj.description = Common.splitString(returnObj.description);
            }

            res[Constants.RETURN] = returnObj;            
        }

        if (fileData.type) {
            res[Constants.TYPE] = fileData.type;
        }

        
        if (fileData.example) {
            const exampleJson = fileData.example.map(e => ({
                code: Common.splitString(e.code),
                description: Common.splitString(e.description)
            }));
            
            res[Constants.EXAMPLE] = exampleJson;
        }
        
        // if (fileData.require) {
        //     const requireJson = fileData.require.map(e => ({
        //             name: e.name,
        //             type: e.type,
        //             description: e.description
        //         }));

        //     res[Constants.REQUIRES] = requireJson;
        // }

        return Object.keys(res).length ? res : null
    }
}