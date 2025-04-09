import fs from 'fs-extra';
import path from 'path';

import { Common } from '../utils/common.js';
import { Constants } from '../utils/constants.js';

export class RenderOperations {
    constructor() { }

    public localizeData(data, directoryPath) {
        if(Array.isArray(data)) {
            const filePath = `${directoryPath}.json`;
            if (fs.existsSync(filePath) && fs.readFileSync(filePath).length) {
                this.replaceLocalizedStrings(data, directoryPath)
            }

            return
        }

        const keys = Object.keys(data);
        keys.forEach(key => {
            this.localizeData(data[key], path.join(directoryPath, key));
        })
    }

    public replaceLocalizedStrings(data, directoryPath) {
        data.forEach(e => {
            const jsonData = fs.readJsonSync(`${directoryPath}.json`);
            return this.localizeObj(e, jsonData[e.context.name]);
        })
    }

    public localizeObj(fileData, jsonData) {
        if (!jsonData) {
            return;
        }

        if (fileData.description && jsonData.description) {
            fileData.description = Common.joinByCharacter(jsonData.description);
        }

        if (fileData.parameter && fileData.parameter.length && jsonData[Constants.PARAMETERS]) {
            fileData.parameter.forEach(p => {
                const paramFromJson = jsonData[Constants.PARAMETERS][p.name];
                if (p.description && paramFromJson) {
                    return p.description = Common.joinByCharacter(paramFromJson.description);
                }
            })
        }

        if (fileData.property && fileData.property.length && jsonData[Constants.PROPERTIES]) {
            fileData.property.forEach(p => {
                const propFromJson = jsonData[Constants.PROPERTIES][p.name];
                if (p.description && propFromJson) {
                    return p.description = Common.joinByCharacter(propFromJson.description);
                }
            });
        }

        if(fileData.return && 
            fileData.return.description && 
            jsonData[Constants.RETURNS] &&
            jsonData[Constants.RETURNS][Constants.DESCRIPTION]) {
                fileData.return.description = Common.joinByCharacter(jsonData[Constants.RETURNS][Constants.DESCRIPTION]);
        }

        if(fileData.example && jsonData[Constants.EXAMPLE]) {
            fileData.example.forEach((e, idx) => {
                const jsonExampleDesc = jsonData[Constants.EXAMPLE][idx].description;
                const jsonExampleCode = jsonData[Constants.EXAMPLE][idx].code;

                if (e.description && jsonExampleDesc) {
                    e.description = Common.joinByCharacter(jsonExampleDesc);
                }

                if(e.code && jsonExampleCode) {
                    e.code = Common.joinByCharacter(jsonExampleCode);
                }

                return e;
            })
        }

        return fileData;
    }
}
