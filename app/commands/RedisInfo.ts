import { encodeMultiline } from "../encoder";
import RedisCommand from "./RedisCommand";
import { getReplicaInfo, serialize } from "./ReplicaInfo";
export default class RedisInfo extends RedisCommand {
    implement(): string {
        const replicaInfo = getReplicaInfo();
        return encodeMultiline(['# Replication', ...serialize(replicaInfo)])
    }
}