import { encodeSimple } from "../encoder";
import RedisCommand from "./RedisCommand";

export default class RedisREPLCONF extends RedisCommand {
    implement(): string {
        const [com, ...arg] = this.argsList;
        return encodeSimple("OK");
    }

}