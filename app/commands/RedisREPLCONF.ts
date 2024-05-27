import { encodeSimple } from "../encoder";
import RedisCommand from "./RedisCommand";

export default class RedisREPLCONF extends RedisCommand {
    implement(): string {
        return encodeSimple("OK");
    }

}