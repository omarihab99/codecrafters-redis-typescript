import { encodeBulk, encodeSimple } from "../encoder";
import RedisCommand from "./RedisCommand";

export default class RedisPing extends RedisCommand {
    implement(): string {
        const [arg] = this.argsList;
        return arg ? encodeBulk(arg) : encodeSimple("PONG");
    }

}