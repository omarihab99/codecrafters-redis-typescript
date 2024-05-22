class ParserError extends Error {
    constructor(message: string) {
        super(message);
    }
    public toString() {
        return `ParserError: ${this.message}`;
    }
}
class CommandError extends Error {
    constructor(message: string) {
        super(message);
    }
    public toString() {
        return `CommandError: ${this.message}`;
    }
}
export { ParserError, CommandError }