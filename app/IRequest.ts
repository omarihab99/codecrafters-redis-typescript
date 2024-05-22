/**
 * Represents a Redis request.
 * @interface
 */
export default interface IRequest {
    /**
     * The number of arguments made.
     * @type {number}
     */
    numberOfArgs: number;

    /**
     * The length of the argument.
     * @type {number}
     */
    argLength: number;

    /**
     * The command being executed.
     * @type {string}
     */
    command: string;

    /**
     * The parameters for the command.
     * @type {string[]}
     */
    params: string[];
}
