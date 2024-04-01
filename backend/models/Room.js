const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  paragraph: {
    type: String,
    required: true,
  },
});

const Room = mongoose.model("Room", RoomSchema);

module.exports = Room;
