/**
 * Encodes a Redis response in the Redis protocol format (simple encoding).
 * @param {string} data - The data to encode.
 * @return {string} The encoded data in the Redis protocol format.
 */
const encodeSimple = (data: string): string => `+${data}\r\n`;

/**
 * Encodes a Redis response in the Redis protocol format (bulk encoding).
 * @param {string} data - The data to encode.
 * @return {string} The encoded data in the Redis protocol format.
 */
const encodeBulk = (data: string): string => data === "" ? "$-1\r\n" : `$${data.length}\r\n${data}\r\n`;

/**
 * Encodes a Redis response in the Redis protocol format (multiline encoding).
 * @param {string[]} data - The data to encode.
 * @return {string} The encoded data in the Redis protocol format.
 */
const encodeMultiline = (data: string[]): string => encodeBulk(data.join("\r\n"));

/**
 * Encodes a Redis response in the Redis protocol format (array encoding).
 * @param data - The data to encode.
 * @returns {string} The encoded data in the Redis protocol format.
 */
const encodeArray = (data: string[]): string => `*${data.length}\r\n${data.map((d) => encodeBulk(d)).join("")}`;
export { encodeSimple, encodeBulk, encodeMultiline, encodeArray };
