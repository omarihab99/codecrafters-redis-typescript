import * as net from "net";
import Rx from "rxjs";
// You can use print statements as follows for debugging, they'll be visible when running tests.
// console.log("Logs from your program will appear here!");

/**
 * Handles the response by writing it to the socket.
 * @param {net.Socket} socket - The socket to write the response to.
 * @param {Buffer} data - The data received from the socket.
 */
async function responseHandler(socket: net.Socket, data: Buffer) {
    const requests = parseCommand(data.toString());
    if (!(requests instanceof ParserError)) {
        const arg = handleRequest(...requests);
        if (arg instanceof CommandError) {
            socket.write(`$${arg.message}\r\n`);
        } else {
            const response = buildResponse(arg);
            socket.write(response);
        }
    }
}
/**
* Handles the socket connection and responds to incoming data with a response message.
* @param {net.Socket} socket - The socket connection to handle.
* @return {void} This function does not return anything.
*/
function socketHandler(socket: net.Socket): void {
    const timeNow = new Date();
    console.log(`[${timeNow.toLocaleString()}][SERVER] Connection established...`);
    socket.on('data', (data: Buffer) => responseHandler(socket, data));
}

const server: net.Server = net.createServer();
const socketServer: Rx.Observable<net.Socket> = Rx.fromEvent(server, "connection") as Rx.Observable<net.Socket>;
socketServer.subscribe(socket => socketHandler(socket));


server.listen(6379, "127.0.0.1");
