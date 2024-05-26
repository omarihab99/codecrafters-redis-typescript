import * as net from "net";
import Rx from "rxjs";
import { buildResponse, handleRequest, parseCommand } from "./request.handle";
import { CommandError, ParserError } from "./CustomError";
import process from "process";
import { logger } from "./logger";
import arg from "arg";
/**
 * Handles the response by writing it to the socket.
 * @param {net.Socket} socket - The socket to write the response to.
 * @param {Buffer} data - The data received from the socket.
 */
async function responseHandler(socket: net.Socket, data: Buffer, role:string) {
    const request = parseCommand(data.toString());  
    if (!(request instanceof ParserError)) {
        const arg = handleRequest(request,role);
        if (arg instanceof CommandError) {
            socket.write(`$${arg.message}\r\n`);
        } else {
            const response = buildResponse(arg,arg.length === 0 ? -1 : arg.length);
            socket.write(response);
        }
    }
    // console.log(request.toString());

}
/**
* Handles the socket connection and responds to incoming data with a response message.
* @param {net.Socket} socket - The socket connection to handle.
* @return {void} This function does not return anything.
*/
function socketHandler(socket: net.Socket, role: string): void {
    const timeNow = new Date();
    console.log(`[${timeNow.toLocaleString()}][SERVER] Connection established...`);
    socket.on('data', (data: Buffer) => responseHandler(socket, data, role));
}
/**
 * Creates a server and listens for incoming socket connections on the specified port.
 *
 * @param {number} port - The port number to listen on.
 * @return {void} This function does not return anything.
 */
function createServer(port: number, role: string): void {
    const server: net.Server = net.createServer();
    const socketServer: Rx.Observable<net.Socket> = Rx.fromEvent(server, "connection") as Rx.Observable<net.Socket>;
    socketServer.subscribe(socket => socketHandler(socket, role));
    server.listen(port, "127.0.0.1");
}

const args = arg({
    "--port": Number,
    "--replicaof": String,
});
createServer(args["--port"] ?? 6379, args["--replicaof"] ? "slave" : "master");
