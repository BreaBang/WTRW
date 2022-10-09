const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  team: {
    type: String,
  },
  club: {
    type: String,
  },
  city: {
    type: String,
  },
  entry: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entry",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
    autopopulate: true
  },
  userName: {
    type: String,  
    ref: 'User',
  },
  createdById:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("Club", ClubSchema);