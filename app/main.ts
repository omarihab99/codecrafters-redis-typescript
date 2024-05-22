import * as net from "net";
// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

const server: net.Server = net.createServer((connection: net.Socket) => {
  // Handle connection
  const timeNow = new Date();
  console.log(`[${timeNow.toLocaleString()}][SERVER] Connection established...`);
  connection.on('data', data => {
    const response = "+PONG\r\n";
    connection.write(response);
    // connection.end();
  })
});

server.listen(6379, "127.0.0.1");
