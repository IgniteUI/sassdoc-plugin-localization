import fs from 'fs-extra';

export class Preprocess {
    /**
     * Prepares json's export directory including main json file 
     * which represents the type per every sass declaration (mixin, variable, function, etc.).
     *  
     * @param groupedData sorted data per group
     * @param directoryPath directory to export
     */
    public static buildJsonsHierarchy(groupedData, directoryPath) {
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
            Preprocess.buildJsonsHierarchy(data, `${directoryPath}/${key}`); 
        })
    }
}
