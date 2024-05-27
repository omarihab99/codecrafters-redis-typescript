import {Data} from "../data";
import { encodeSimple } from "../encoder";
import RedisCommand from "./RedisCommand";

export default class RedisSet extends RedisCommand {
    implement(): string {
        const [key, value, px, ex] = this.argsList;
        Data.set(key, value, px ? parseInt(ex) : 0);
        return encodeSimple("OK");
    }
}