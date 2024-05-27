import RedisEcho from "./RedisEcho";
import RedisGet from "./RedisGet";
import RedisInfo from "./RedisInfo";
import RedisSet from "./RedisSet";
import RedisPing from "./RedisPing";
import RedisREPLCONF from "./RedisREPLCONF";
import RedisPSYNC from "./RedisPSYNC";
enum Command {
    PING = 'PING',
    ECHO = 'ECHO',
    SET = 'SET',
    GET = 'GET',
    INFO = 'INFO',
    REPLCONF = 'REPLCONF',
    PSYNC = "PSYNC"
}
const Commands = {
    [Command.PING]: RedisPing,
    [Command.ECHO]: RedisEcho,
    [Command.SET]: RedisSet,
    [Command.GET]: RedisGet,
    [Command.INFO]: RedisInfo,
    [Command.REPLCONF]: RedisREPLCONF,
    [Command.PSYNC]: RedisPSYNC
};
const isCommand = (command: string) => Object.values(Command).includes(command.toUpperCase() as Command);
export { Command, isCommand, Commands };