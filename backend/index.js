require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.SITE_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Socket connected: ${socket.id}`);

  socket.emit("sending_our_id", socket.id);

  socket.on("join_room", (playerData) => {
    // When user joins the room
    socket.join(playerData.roomId);

    // Send the user details to all the users already in the room
    socket.to(playerData.roomId).emit("player_joined", socket.id);
  });

  socket.on("sending_back_details", (playerData) => {
    socket.to(playerData.roomId).emit("receive_details", playerData.id);
  });

  socket.on("sending_progress", (progressData) => {
    socket.to(progressData.roomId).emit("receiving_progress", progressData);
  });
});

server.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
