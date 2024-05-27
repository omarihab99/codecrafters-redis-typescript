import { encodeSimple } from "../encoder";
import RedisCommand from "./RedisCommand";

export default class RedisPSYNC extends RedisCommand {
    implement(): string {
        const [_com, repl_id, _offset] = this.argsList;
        return encodeSimple(`FULLRESYNC ${repl_id} 0`);
    }

}