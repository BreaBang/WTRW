const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  comment: {
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

module.exports = mongoose.model("Comment", CommentSchema);