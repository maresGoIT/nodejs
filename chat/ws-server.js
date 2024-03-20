import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });

console.log("WS Server started");
wss.on("connection", function connection(ws) {
  console.log("A new client connected!");
  ws.on("message", function incoming(message) {
    console.log("received: %s", message);

    // Broadcast incoming message to all clients
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.send("Welcome to the chat!");
});
