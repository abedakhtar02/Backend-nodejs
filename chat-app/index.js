const http = require("http");
const path = require("path");
const express = require("express");
const PORT = 9000;
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app); //needed for websockets
const io = new Server(server); //attach socket.io to server

//socket.io handler.

//io = manager/controller of all WebSocket connections.
//socket(below) is indivisual connections.
//Each time a client connects, io triggers:
io.on("connection", (socket) => {
  socket.on("client-message", (message) => {
    io.emit("message", message); 
});
});

app.use(express.static(path.resolve("./public")));

server.listen(PORT, () => console.log(`Server started at port : ${PORT}`));
