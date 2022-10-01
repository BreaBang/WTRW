const Comment = require("../models/Comment")
const Entry = require("../models/Entry")


module.exports = {
  createComment: async (req, res) => {
    try {
      await Comment.create({
        comment: req.body.comment,
        entry: req.params.id,
        userName: req.user.userName,
        user: req.user.id
      });
      console.log("Comment has been added!");
      res.redirect("/entries/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  },
  deleteComment: async (req, res) => {
    try {
      await Comment.deleteOne({ _id: req.params.commentid })
      console.log("comment removed")
      res.redirect("/entries/"+req.params.id);
    } catch (err) {
      console.log(err);
    }
  }
}