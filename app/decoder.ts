import _ from "lodash";
/**
 * Decodes a Redis data string into an array of arrays of strings.
 *
 * @param {string} data - The Redis data string to decode.
 * @return {string[][]} An array of arrays of strings representing the decoded data.
 */
const decodeResp = (data: string): string[][] =>
    _.chain(data)
        .split(/\*\d+\r\n/)
        .map((cmd) => _.split(cmd, /\$\d+\r\n/))
        .value();
/**
 * Decodes an inline Redis data string into an array of arrays of strings.
 *
 * @param {string} data - The inline Redis data string to decode.
 * @return {string[][]} An array of arrays of strings representing the decoded data.
 */
const decodeInline = (data: string): string[][] =>
    _.chain(data)
        .split(/\r\n/)
        .map((cmd) => _.split(cmd, "+"))
        .value();

/**
 * Filters out empty strings and trims whitespace from each string in the given array.
 *
 * @param {string[]} data - The array of strings to clean.
 * @return {string[]} The cleaned array of strings.
 */
const clean = (data: string[]): string[] =>
    _.chain(data)
        .filter((cmd) => !_.isEmpty(cmd))
        .map((cmd) => cmd.trim())
        .value();

/**
 * Decodes a Redis data string into an array of arrays of strings.
 *
 * @param {string} data - The Redis data string to decode.
 * @return {string[][]} An array of arrays of strings representing the decoded data.
 */
const decode = (data: string): string[][] => {
    const isInline = !data.startsWith("*");
    const commands = isInline ? decodeInline(data) : decodeResp(data);
    return _.chain(commands).map(clean).filter((cmd) => !_.isEmpty(cmd)).value();
};
export default decode;