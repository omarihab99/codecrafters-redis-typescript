import RedisCommand from "./commands/RedisCommand";
import { isCommand, Commands, Command } from "./commands/Command";
import { CommandError } from "./CustomError";
export default class RedisQueue {
    public commands: RedisCommand[] = [];

    /**
     * Adds a command to the queue.
     *
     * @param {string[]} data The command and its arguments as an array of strings.
     * @return {void} This function does not return anything.
     */
    push(data: string[]): void {
        const [com, ...args] = data;
        if (isCommand(com)) {
            const commandValue = Command[com.toUpperCase() as Command];
            this.commands.push(new Commands[commandValue](commandValue, args));
        } else {
            console.error(new CommandError(`Invalid command: ${com}`).toString());
        }
    }
}
