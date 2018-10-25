import * as fs from 'fs-extra';

export class Preprocess {
    public static buildHierarchy(groupedData, directoryPath) {
        if (Array.isArray(groupedData)) {
            const file = `${directoryPath}.json`;
            if(!fs.existsSync(file)) {
                fs.writeFileSync(file, "");
            }

            return;
        }
        
        fs.ensureDirSync(directoryPath);

        const keys = Object.keys(groupedData);
        keys.forEach(key => {
            const data = groupedData[key];
            Preprocess.buildHierarchy(data, `${directoryPath}/${key}`); 
        })
    }

    // private static buildGlobalFileTypes(groupedData, directoryPath) {
    //     const keys = Object.keys(groupedData);
    //     keys.forEach(groupName => {
    //         const filePath = `${directoryPath}/${groupName}`
    //         fs.ensureDirSync(filePath);
    //         Preprocess.buildFileTypes(groupedData[groupName], filePath);
    //     });
    // }

    // private static buildFileTypes(group, filePath) {
    //     const keys = Object.keys(group);
    //     keys.forEach(e => {
    //         const file = `${filePath}/${e}.json`;
    //         if(!fs.existsSync(file)) {
    //             fs.writeFileSync(file, "");
    //         }
    //     });
    // }
}