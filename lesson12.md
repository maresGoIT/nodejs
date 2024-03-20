---
title: NodeJS - Lesson 12
description: Fullstack Online - GoIT - Lesson
tags:
  - nodemail
  - sendgrid
  - docker
---
# Lesson 12: WebSockets and Socket.io 🔌

## Objectives 🎯
- Understand **WebSockets** and their role in real-time communication.
- Explore the **`ws` library** for WebSocket communication.
- Learn to implement real-time communication in an Express app using **Socket.io**.
- Build a **basic real-time chat application**.

## Part 1: Introduction to WebSockets 🌐

### What Are WebSockets? 💡
A WebSocket is a communication protocol that provides full-duplex communication channels over a single TCP connection. It enables real-time, event-driven connection between a client and a server.

![FullDuplex](https://cdn.everythingrf.com/live/1679566744825_638151635411310923.png)

### Basics of WebSocket Protocol 🔄
Unlike traditional HTTP software, which follows a request-response model, WebSockets allow two-way (bi-directional) communication. This means that the client and the server can send data to each other anytime without continuous polling.

![Websockets](https://scaler.com/topics/images/websocket-image1.webp)

### Where do we use this? 🌍

1. **Chat Apps:** Instantly sending messages in group chats 💬.
2. **Online Games:** Keeping your game moves synced with friends 🎮.
3. **Stock Trading:** Getting live updates on stock prices 💹.
4. **Document Collaboration:** Working on the same document at the same time 📝.
5. **Sports Updates:** Cheering with live scores of your favorite games 🏈.
6. **Smart Home Devices:** Controlling your lights or thermostat from afar 🏠.

---
## Part 2: Exploring the `ws` Library 📡

Creating a WebSocket server/client chat application involves setting up a WebSocket server that can handle real-time bi-directional communication with clients. For this guide, we'll use the `ws` library in Node.js for the server and vanilla JavaScript for the client.

### Step 1: Setup Your Project

1. **Initialize a New Node.js Project:**
   - Create a new directory for your project and navigate into it.
   - Run `npm init -y` to generate a `package.json` file.

2. **Install ws:**
   - Install the WebSocket library `ws` by running `npm install ws`.

### Step 2: Create the WebSocket Server

1. **Create a Server File:**
   - In your project directory, create a file named `server.js`.

2. **Set Up the WebSocket Server:**
   - Open `server.js` and add the following code to create a WebSocket server that listens for connections and messages:

```javascript
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
```

3. **Run Your Server:**
   - Start your WebSocket server by running `node server.js` in your terminal. Your server will listen on port 8080.

### Step 3: Create the WebSocket Client

1. **Create an HTML File for the Client:**
   - In your project directory, create an HTML file named `index.html`.

2. **Set Up the Client Interface and WebSocket Connection:**
   - Edit `index.html` to include a simple chat interface and JavaScript for connecting to the WebSocket server:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>WebSocket Chat</title>
  </head>
  <body>
    <h2>WebSocket Chat</h2>
    <div id="chat"></div>
    <input type="text" id="messageInput" placeholder="Type a message..." />
    <button onclick="sendMessage()">Send</button>

    <script>
      var ws = new WebSocket("ws://localhost:8080");
      ws.binaryType = "blob";

      var chat = document.getElementById("chat");

      ws.onmessage = function (event) {
        var messageParagraph = document.createElement("p");

        if (event.data instanceof Blob) {
          reader = new FileReader();
          reader.onload = () => {
            messageParagraph.innerHTML = reader.result;
            chat.appendChild(messageParagraph);
          };
          reader.readAsText(event.data);
        } else {
          console.log("Result2: " + event.data);
          messageParagraph.innerHTML = event.data;
          chat.appendChild(messageParagraph);
        }
      };

      function sendMessage() {
        var input = document.getElementById("messageInput");
        ws.send(input.value);
        input.value = "";
      }
    </script>
  </body>
</html>
```

This code establishes a WebSocket connection to the server running on `localhost:8080` and defines a simple UI for sending and displaying messages.

### Step 4: Test Your Chat Application

1. **Open the Client in a Browser:**
   - Open `index.html` in your browser. You should see the chat interface.

2. **Connect Multiple Clients:**
   - Open `index.html` in multiple browser windows or tabs to simulate multiple clients.

3. **Send Messages:**
   - Type a message in the input field and click "Send". The message should appear in all connected clients, including the one that sent the message.

Congratulations! 🎉 You've created a basic chat application using WebSockets with the `ws` library. This setup allows real-time communication between a server and clients, enabling messages to be sent back and forth instantly.

---

## Part 3: Getting Started with Socket.io 🚀

Socket.IO is an event-driven library for real-time web applications. It enables real-time, bi-directional communication between web clients and servers. It consists of two components: a client, and a server.

| Feature | `ws` | Socket.io |
|---------|------|-----------|
| **Ease of Use** | - Minimal abstraction requires manual handling of many aspects of WebSocket communication. | - High-level abstraction with built-in features like automatic reconnection, namespaces, and rooms. |
| **Flexibility** | - Offers more control and flexibility due to its minimalistic approach. | - Less flexibility in lower-level handling due to its abstraction, but highly customizable through events and middleware. |
| **Scalability** | - Lightweight, but requires manual implementation for features like broadcasting and scaling across multiple servers. | - Supports scalability through adapters (e.g., Redis) for easy scaling across multiple processes or servers. |
| **Compatibility** | - Focused on the WebSocket protocol without built-in fallback options for older browsers or problematic network conditions. | - Automatically handles fallbacks to long-polling or other transport methods when WebSockets are not available, ensuring broader compatibility. |
| **Feature-Rich** | - Provides a clean, low-level API for WebSocket communication, leaving additional features to the developer. | - Rich set of built-in features like automatic reconnection, event-based communication, rooms, and namespaces. |
| **Performance** | - Slightly better raw performance due to its simplicity and closer adherence to the WebSocket protocol. | - Additional features and overhead may impact performance, though differences are often negligible for most applications. |
| **Use Case** | - Suitable for projects where full control over WebSocket communication is needed or when WebSocket support is the only requirement. | - Ideal for real-time applications that require robust features out of the box, like chat applications, real-time analytics, and interactive games. |

### Recommendation for a Chat Application

For a **chat application**, **Socket.io** is generally recommended due to its ease of use, comprehensive feature set (including automatic reconnection, rooms, and namespaces), and built-in support for scalability and compatibility across different environments. 

These features significantly reduce development time and complexity, making it easier to implement typical chat application requirements, such as direct messages, group chats, and real-time updates.

### Setup 🛠
Ensure Node.js and npm are installed. Initialize a new Node.js project and install Express and Socket.io:
```bash
mkdir websocket-chat && cd websocket-chat
npm init -y
npm install express socket.io
```

### Setting Up Socket.io 🔧
Socket.io abstracts WebSocket communications, offering additional features and fallbacks for compatibility. To integrate Socket.io into an Express app, follow this setup:

**server.js:**
```javascript
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on *:3000');
});
```

### Simple Communication with Socket.io 💬
Create a client-side HTML file to connect and communicate with the Socket.io server.

**Client-side (public/index.html):**
```html
<!DOCTYPE html>
<html>
<head>
  <title>Socket.io Chat</title>
</head>
<body>
<script src="https://cdn.socket.io/4.7.5/socket.io.min.js" integrity="sha384-2huaZvOR9iDzHqslqwpR87isEmrfxqyWOF7hr7BY6KG0+hVKLoEXMPUJw3ynWuhO" crossorigin="anonymous"></script>
  <script>
    const socket = io();
  </script>
</body>
</html>
```

---
## Conclusion 🌟
We've explored the basics of WebSockets, the power of Socket.io, the simplicity of the `ws` library, and walked through building a basic chat application. This foundation will empower you to implement real-time communication in your web applications.

## Further Reading 🔍
- [Socket.io Documentation](https://socket.io/docs/)
- [WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Express Documentation](https://expressjs.com/)
