export class Common {
    public static splitString(val) {
        return val ? val.split('\n') : val;
    }

    public static joinByCharacter(data) {
        return data.join('\n');
    }
}