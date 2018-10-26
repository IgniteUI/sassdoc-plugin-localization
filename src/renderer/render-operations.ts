import * as fs from 'fs-extra';
import { Common } from '../utils/common';
import { Constants } from '../utils/constants';

export class RenderOperations {
    constructor() { }

    public localizaData(data, directoryPath) {
        if(Array.isArray(data)) {
            this.replaceLocalizedStrings(data, directoryPath)
            return
        }

        const keys = Object.keys(data);
        keys.forEach(key => {
            this.localizaData(data[key], `${directoryPath}/${key}`);
        })
    }

    public replaceLocalizedStrings(data, directoryPath) {
        data.forEach(e => {
            const jsonData = fs.readJsonSync(`${directoryPath}.json`);
            return this.localizeObj(e, jsonData[e.context.name]);
        })
    }

    public localizeObj(fileData, jsonData) {
        if (fileData.description && jsonData.description) {
            fileData.description = Common.joinByCharacter(jsonData.description);
        }

        if (fileData.parameter && fileData.parameter.length && jsonData[Constants.PARAMETERS]) {
            fileData.parameter.forEach(p => {
                return p.description = Common.joinByCharacter(jsonData[Constants.PARAMETERS][p.name].description);
            })
        }

        if(fileData.return && jsonData[Constants.RETURNS]) {
            fileData.return = Common.joinByCharacter(jsonData[Constants.RETURNS]);
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