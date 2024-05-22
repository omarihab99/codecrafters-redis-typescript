export default class Data {
    private static readonly map = new Map<string,string>();
    static set(key:string, value: string): void {
        this.map.set(key, value);
    }
    static get(key:string): string  {
        return this.map.get(key) ?? "";
    }
}
