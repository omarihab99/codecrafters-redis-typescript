import { CommandError, ParserError } from "./CustomError";
/**
 * Parses a command string and returns an array of matches or a ParserError if the command is invalid.
 * @param {string} command - The command string to parse.
 * @return {string[] | ParserError} An array of matches or a ParserError if the command is invalid.
 */
function parseCommand(command: string): string[] | ParserError {
    //TODO: Implement it suing regex.

    const matches = command.split('\r\n');
    if (matches) {
        console.log(matches);

        matches[0] = matches[0].substring(1);
        matches[1] = matches[1].substring(1);
        matches[3] = matches[3].substring(1);
        return matches;
    }
    return new ParserError(`Invalid command: ${command}`);
}
/**
 * Handles a Redis command and returns a response string or a CommandError.
 * @param {string[]} args - An array of strings representing the command arguments.
 * @return {string | CommandError} - The response string or a CommandError if the command is invalid.
 */
function handleRequest(...args: string[]): string | CommandError {
    const [_reqsNumber, _commandLength, command, _argLength, arg] = args;
    switch (command) {
        case 'PING' || 'ping':
            return `PONG`;
        case 'ECHO' || 'echo':
            return `${arg}`;
        default:
            return new CommandError(`Invalid command: ${command}`);
    }
}
/**
 * Builds a response string in the Redis protocol format.
 * @param {string} arg - The argument to be included in the response.
 * @return {string} The response string in the Redis protocol format.
 */
function buildResponse(arg: string): string {
    return `$${arg.length}\r\n${arg}\r\n`;
}

export { parseCommand, handleRequest, buildResponse };