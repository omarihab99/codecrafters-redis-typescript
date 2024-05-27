import RedisCommand from "./RedisCommand";
import { encodeBulk } from "../encoder";
class RedisEcho extends RedisCommand {
    /**
     * Implements the functionality of the Redis ECHO command.
     *
     * @return {string} The encoded string in the Redis protocol format.
     */
    implement(): string {
        const [arg] = this.argsList;
        return encodeBulk(arg);
    }
}
export default RedisEcho;