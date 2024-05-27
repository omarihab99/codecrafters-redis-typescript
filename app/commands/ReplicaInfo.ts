import crypto from "crypto";
interface IReplicaInfo {
    role: "master" | "slave";
    master_replid?: string;
    master_repl_offset?: number;
}
const replicaInfo: IReplicaInfo = { role: "master", master_replid: crypto.randomBytes(20).toString('hex'), master_repl_offset: 0 };
const setRule = (isReplica: boolean) => replicaInfo.role = isReplica ? "slave" : "master";
const getReplicaInfo = (): IReplicaInfo => replicaInfo;
const serialize = (replicaInfo: IReplicaInfo) => Object.entries(replicaInfo).map(([key, value]) => `${key}:${value}`);
export { IReplicaInfo, getReplicaInfo, setRule, serialize, replicaInfo };
