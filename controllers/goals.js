const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');
const mongoose = require('mongoose');
const Goal = require("../models/Goal")
const Entry = require("../models/Entry")


module.exports = {
getGoalPage: async (req, res) => {
    try {
      res.render("goal");
    } catch (err){
      console.log(err);
    }
  },
createGoal: async (req, res) => {
  try {
    await Goal.create({
      goal: req.body.goal,
      completed: false,
      userName: req.user.userName,
      user: req.user.id,
    });
    console.log(req.body)
    console.log('Goal has been added')
    res.redirect('/dashboard') // leave slash
  } catch (err) {
    console.log(err)
  }
},
deleteGoal: async (req, res) => {
    try {
      const goal = await Goal.findById({ _id: req.params.id });
      await Goal.remove({ _id: req.params.id });
      console.log("Deleted Goal");
      res.redirect("/dashboard");
    } catch (err) { 
      res.redirect("/dashboard");
    }
  },
};