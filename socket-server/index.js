import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (data) => {
    console.log("Am primit mesaj:");
    console.log(data);
    io.emit("chat message", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("hello world");
});

server.listen(3000, () => {
  console.log("Listening on *:3000");
});
