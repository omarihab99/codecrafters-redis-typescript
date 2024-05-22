import { CommandError, ParserError } from "./CustomError";
import Data from "./data";
import IRequest from "./IRequest";
import { Command } from "./Command.enum";
/**
 * Parses a command string and returns an IRequest object or a ParserError if the command is invalid.
 *
 * @param {string} command - The command string to parse.
 * @return {IRequest | ParserError} - An IRequest object or a ParserError if the command is invalid.
 */
function parseCommand(command: string): IRequest | ParserError {
    //TODO: Implement it using regex.
    const matches = command.split('\r\n');
    if (matches) {
        let requestData: IRequest = {
            numberOfArgs: 0,
            argLength: 0,
            command: "",
            params: [],
        };
        matches.forEach(match => {
            if (match.startsWith("*")) {
                const numOfArgs = parseInt(match.split('')[1]);
                requestData.numberOfArgs = numOfArgs;
            } else if (match.startsWith("$")) {
                const length = parseInt(match.split('')[1]);
                requestData.argLength = length;
            } else if (match === Command.PING || match === Command.ECHO || match === Command.SET || match === Command.GET) {
                requestData.command = match;
            } else {
                requestData.params.push(match);
            }
        });
        return requestData;
    }
    return new ParserError(`Invalid command: ${command}`);
}
/**
 * Handles a Redis command and returns a response string or a CommandError.
 * @param {IRequest} request - An IRequest object representing the command arguments.
 * @return {string | CommandError} - The response string or a CommandError if the command is invalid.
 */
function handleRequest(request: IRequest): string | CommandError {
    const { command } = request;
    switch (command) {
        case 'PING' || 'ping':
            return `PONG`;
        case 'ECHO' || 'echo':
            return `${request.params[0]}`;
        case 'SET' || 'set':
            Data.set(request.params[0], request.params[1], +request.params[3] ?? 0);
            return `OK`;
        case 'GET' || 'get':
            return Data.get(request.params[0]);
        default:
            return new CommandError(`Invalid command: ${command}`);
    }
}
/**
 * Builds a response string in the Redis protocol format.
 * @param {string} arg - The argument to be included in the response.
 * @return {string} The response string in the Redis protocol format.
 */
function buildResponse(arg: string, length: number): string {
    if (arg === "") return "$-1\r\n";
    if (arg === "OK") return `+${arg}\r\n`;
    return `$${length}\r\n${arg}\r\n`;
}

export { parseCommand, handleRequest, buildResponse };