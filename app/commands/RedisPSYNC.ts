import { encodeSimple } from "../encoder";
import RedisCommand from "./RedisCommand";
import { replicaInfo } from "./ReplicaInfo";
export default class RedisPSYNC extends RedisCommand {
  implement(): string {
    return encodeSimple(
      `FULLRESYNC ${replicaInfo.master_replid} ${
        replicaInfo.master_repl_offset
      }`
    );
  }
}
