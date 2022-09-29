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
    const entries = await Entry.findById(req.params.id);
    //const comments = await Comments.find({post: req.params.id}).sort({ createdAt: "asc" }).lean();
    res.render("entry", { entries: entries, user: req.user });
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
      res.render("add");
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
    console.log('Entry has been added')
    res.redirect('/dashboard') // leave slash
  } catch (err) {
    console.log(err)
  }
},
getEditPage: async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);
    //const comments = await Comments.find({post: req.params.id}).sort({ createdAt: "asc" }).lean();
    res.render("/edit", { entry: entry });
  } catch (err) {
    console.log(err); 
  }
},
updateEntry: async (req, res) => {
  try{
      let entry = await Entry.findById(req.params.id).lean() // Mongoose method to check for ids. 
    
      if (!entry){ // If there is not a story, return a 404 error. 
        return res.render('error/404')
      }
      // Check Owner of the Story - should be logged in user's ID. If not it will redirect. 
      if (entry.user != req.user.id) {
        res.redirect('/stories') 
    } else { // If it passess the checks, we're using another mongoose method to find the one story and to perform an update operation on it. 
          entry = await Entry.findOneAndUpdate({_id: req.params.id}, req.body, { //Finding the story by the id and replacing the content of the body with the request.
            new: true,  // For some reason if we try to update a story that doesn't exist it will create a new one.
            runValidators: true // Running validation through the story schema again to make sure it follows all the rules we expect it to follow to make sure nothing malicious enters the database. 
          })
    
          res.redirect('/entry') // When we're done - go back to the dashboard. 
      }
      } catch (err){
      console.log(errr)
      res.render('error/500')
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