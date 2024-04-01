require("dotenv").config();

const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const axios = require("axios");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);

const Room = require("./models/Room");

app.use(cors());
app.use(express.json());

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

app.get("/:roomId", async (req, res) => {
  try {
    const room = await Room.findById(req.params.roomId);

    res.json({
      status: "successful",
      paragraph: room.paragraph,
    });
  } catch (error) {
    res.json({
      status: "error",
    });
  }
});

app.post("/room", async (req, res) => {
  if (!req.body.userId) return;

  const result = await axios.get("https://api.quotable.io/quotes/random");
  console.log(result.data);

  const room = await Room.create({
    username: req.body.userId,
    paragraph: result.data[0].content,
  });

  res.json({
    status: "successful",
    id: room._id,
  });
});

server.listen(5000, () => {
  console.log("Listening on PORT 5000");
});
