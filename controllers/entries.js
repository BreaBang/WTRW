const cloudinary = require("../middleware/cloudinary");
const Comments = require("../models/Comments");
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

/* //destructuring - I want to bring in both of 
these at the same time from the same location.  Bringing in multiple items at the same time from the same location. */

const Entry = require('../models/Entry') //adding the story model

module.exports = {
  getDashboard: async (req, res) => {
    try {
    // Explanation for below lines
    // Post is from the model - use the post model, look in the post collection, find the user by id. 
      const entry = await Entry.find({ user: req.user.id });
      // Show that user's data on the profile.ejs page. It will pass their posts and user information through. 
      res.render("dashboard.ejs", { entry: entry, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  getCommunity: async (req, res) => {
    try {
      // Explanation for below lines
      // .lean is just mongoose
      // Post is from our model, telling it to find posts and sort them by the createdAt desc from the database
      const entries = await Entry.find().sort({ createdAt: "desc" }).lean();
      // res.render is just show the feed.ejs view/page and to show the posts stored in our database. 
      res.render("community.ejs", { entries: entries });
    } catch (err) {
      console.log(err);
    }
  },
  getAddPage: async (req, res) => {
    try {
      res.render("add.ejs");
    } catch (err){
      console.log(err);
    }
  },
  getEntry: async (req, res) => {
    try {
      const entry = await Entry.findById(req.params.id);
      const comments = await Comments.find({post: req.params.id}).sort({ createdAt: "asc" }).lean();
      res.render("community.ejs", { entry: entry, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
// @desc Proess add form 
// @route POST/stories
  createEntry: async (req, res) => {
    try {
        await Entry.create({
          title: req.body.title,
          body: req.params.body,
          user: req.user.id,
        });
      res.redirect('/dashboard') //once we submit a story, it will send us back to the dashboard.
      console.log("Post has been added!");
    } catch (err) {
      console.error(err)
      res.render('error/500')
  }},
  likePost: async (req, res) => {
    try {
      await Entry.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let entry = await Entry.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Entry.remove({ _id: req.params.id });
      console.log("Deleted Post");
      // Render (or show) the profile page
      res.redirect("/dashboard");
    } catch (err) {
      // if there is an error for some reason, it will still render the profile page. 
      res.redirect("/dashboard");
    }
  },
};