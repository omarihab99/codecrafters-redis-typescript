/**
 * Parses a command string and returns an array of matches or a ParserError if the command is invalid.
 * @param {string} command - The command string to parse.
 * @return {RegExpMatchArray | ParserError} An array of matches or a ParserError if the command is invalid.
 */
function parseCommand(command: string): RegExpMatchArray | ParserError {
    const re = new RegExp('\b[a-zA-Z]+\b|\bd+\b');
    const matches: RegExpMatchArray | null = command.match(re);
    if (matches) {
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