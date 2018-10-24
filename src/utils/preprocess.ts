import * as fs from 'fs';

export class Preprocess {
    public static buildHierarchy(data, directoryPath) {
        if(!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath);
        }
    
        Preprocess.createDirectoryGroups(data, directoryPath);
    }

    private static createDirectoryGroups(data, directoryPath) {
        const groups = Object.keys(data.byGroupAndType);
        groups.forEach(e => {
            if (!fs.existsSync(`${directoryPath}/${e}`)) {
                fs.mkdirSync(`${directoryPath}/${e}`);
            }
        });
    }
}