type ValueType = { value: string, expiry: number };
export default class Data {
    private static readonly map = new Map<string, ValueType>();
    private static time: number;
    /**
     * Initializes a new instance of the Data class.
     *
     * This constructor sets the static property `time` of the Data class to 0.
     */
    constructor() {
        Data.time = 0;
    }
        /**
     * Sets a key-value pair in the Data map with an optional expiry time.
     *
     * @param {string} key - The key to set in the map.
     * @param {string} value - The value to associate with the key.
     * @param {number} expiry - The expiry time for the key-value pair in milliseconds.
     * @return {void} This function does not return a value.
     */

    static set(key: string, value: string, expiry: number): void {
        Data.map.set(key, { value, expiry });
        Data.time = new Date().getTime();
    }
    /**
     * Retrieves the value associated with the given key from the Data map.
     * If the value has an expiry time and the current time has exceeded the expiry time,
     * an empty string is returned. Otherwise, the value is returned.
     *
     * @param {string} key - The key to retrieve the value for.
     * @return {string} The value associated with the key, or an empty string if the value has expired.
     */
    static get(key: string): string {
        const now = new Date().getTime();
        const { value, expiry } = Data.map.get(key) ?? { value: "", expiry: 0 };
        if (expiry > 0 && now - Data.time > expiry) {
            return "";
        }
        return value;
    }
}
