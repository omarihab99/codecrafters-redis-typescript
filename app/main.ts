import * as net from "net";
import arg from "arg";
import parse from "./parser";
import { setRule } from "./commands/ReplicaInfo";
import { encodeArray } from "./encoder";

/**
 * Handles the response by writing it to the socket.
 *
 * @param {net.Socket} connection - The socket to write the response to.
 * @param {string} data - The data received from the socket.
 * @return {void} This function does not return anything.
 */
const responseHandler = (connection: net.Socket, data: string): void => {
    parse(data).commands.forEach((command) => {
        connection.write(command.execute());
    });
};
/**
 * Connects to the master server and sends a message.
 *
 * @param {string} msg - The message to send to the master server.
 * @param {object} options - The options for the connection.
 * @param {string} options.host - The hostname of the master server.
 * @param {number} options.port - The port number of the master server.
 */
const connectToMaster = (msg: string, options: { host: string, port: number }) => {
    const replica = net.createConnection(options, () => {
        replica.write(encodeArray([msg]));
    });
}
const server = net.createServer((connection) => {
    connection.on('data', (data) => {
        responseHandler(connection, data.toString());
    });
});

const args = arg({
    "--port": Number,
    "--replicaof": String,
});
server.listen((args["--port"]) ?? 6379, "127.0.0.1");

if (args["--replicaof"]) {
    setRule(true);
    const [host, port] = args["--replicaof"].split(" ");
    connectToMaster("PING", { host, port: Number(port) });
}