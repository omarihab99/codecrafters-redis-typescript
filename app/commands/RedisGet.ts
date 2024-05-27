import {Data} from "../data";
import { encodeBulk, encodeSimple } from "../encoder";
import RedisCommand from "./RedisCommand";


export default class RedisGet extends RedisCommand {
    implement(): string {
        const [key] = this.argsList;
        return encodeBulk(Data.get(key));
    }
}