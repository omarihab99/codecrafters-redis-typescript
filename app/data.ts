type ValueType = { value: string, expiry: number };
export default class Data {
    private static readonly map = new Map<string, ValueType>();
    private static time: number;
    constructor() {
        Data.time = 0;
    }
    static set(key: string, value: string, expiry: number): void {
        Data.map.set(key, { value, expiry });
        Data.time = new Date().getTime();
    }
    static get(key: string): string {
        const now = new Date().getTime();
        const { value, expiry } = Data.map.get(key) ?? { value: "", expiry: 0 };
        if (expiry > 0 && now - Data.time > expiry) {
            return "";
        }
        return value;
    }
}
