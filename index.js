const http = require("http");
const path = require("path");
const express = require("express");
const app = express();
const { Server } = require("socket.io");

const server = http.createServer(app);

// creating websocket server in node server
const io = new Server(server);

// yaha par socket(client) se message aayega or sare active socket ko send ho jaega
io.on("connection", (socket) => {
  // console.log('a user connected with server ->', socket.id );
  socket.on("user-massage", (message) => {
    io.emit("message", message);
  });
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
  return res.sendFile("/public/index.html");
});

const port = 9000;
server.listen(port, (req, res) => {
  console.log(" server is running at port", port);
});
