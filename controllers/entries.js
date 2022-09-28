const Comments = require("../models/Comments");
const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')
const mongoose = require('mongoose')
const User = require("../models/User")
const Entry = require('../models/Entry') //adding the story model


module.exports = {
getCommunity: async (req, res) => {
    try{
      const entries = await Entry.find({ status: 'public' })
          .populate('entry') 
          .sort({ createdAt: 'desc'})
          .lean() 

          res.render('community', { 
            entries: entries, body: req.body, userName: req.user.userName
          }
          )
  } catch (err) {
      console.error(err)
      res.render('error/500')

  }
},
getEntry: async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    //const comments = await Comments.find({post: req.params.id}).sort({ createdAt: "asc" }).lean();
    res.render("entry", { entry: entry, user: req.user });
  } catch (err) {
    console.log(err);
  }
},
  getDashboard: async (req, res) => {
    try {
      const entries = await Entry.find({user: req.user.id});

      res.render("dashboard", { entries: entries, user: req.user });
  } catch (err){
      console.error(err)
      res.render('error/500')
      }

  },
  getAddPage: async (req, res) => {
    try {
      res.render("add.ejs");
    } catch (err){
      console.log(err);
    }
  },
createEntry: async (req, res) => {
  try {
    await Entry.create({
      title: req.body.title,
      status: req.body.status,
      body: req.body.body,
      userName: req.user.userName,
      user: req.user.id
    }
    );
    console.log(req.body)
    //await Entry.create({ creator: req.user.userName,  })
    console.log('Entry has been added')
    res.redirect('/dashboard')
  } catch (err) {
    console.log(err)
  }
},
  likeEntry: async (req, res) => {
    try {
      await Entry.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      console.log("Likes +1");
      res.redirect(`/entry/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deleteEntry: async (req, res) => {
    try {
      // Find post by id
      let entry = await Entry.findById({ _id: req.params.id });
      // Delete post from db
      await Entry.remove({ _id: req.params.id });
      console.log("Deleted Entry");
      // Render (or show) the profile page
      res.redirect("/dashboard");
    } catch (err) {
      // if there is an error for some reason, it will still render the profile page. 
      res.redirect("/dashboard");
    }
  },
};