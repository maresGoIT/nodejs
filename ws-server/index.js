import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("WS Server started");
wss.on("connection", function connection(ws) {
  console.log("Un client s-a conectat");
  ws.on("message", function incoming(data) {
    console.log("received a message:");
    console.dir(data);
    // Save message to db

    // Broadcast incoming message to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
