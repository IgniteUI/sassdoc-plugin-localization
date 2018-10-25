import * as fs from 'fs-extra';

export class FileOperations {
    public static writeToJson(filePath, data) {
        fs.writeFileSync(`${filePath}.json`, JSON.stringify(data, null, 4))
    }
}