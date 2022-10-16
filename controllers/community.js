const Entry = require('../models/Entry');
const Comment = require("../models/Comment");
const Goal = require("../models/Goal");
const Race = require("../models/Race");
const Club = require("../models/Club")
const User = require('../models/User')

module.exports = {
addBuddy: async (req,res) =>{
    try {
        await User.findOneAndUpdate({_id: req.user.id}, 
            {$addToSet: {buddies: req.params.id}})
        console.log('Added Buddy')
        res.redirect('/buddies')
    } catch (err) {
        console.log(err)
    }
},
// Removes follower from 'friends.ejs'
removeBuddy: async (req,res) =>{
    try {
        await User.findOneAndUpdate({_id: req.user.id}, 
            {$pull: {friends: req.params.id}})
        console.log('Deleted Buddy')
        res.redirect('/buddies')
    } catch (err) {
        console.log(err)
    }
},
}