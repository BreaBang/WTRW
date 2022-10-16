const Entry = require('../models/Entry');
const Comment = require("../models/Comment");
const Goal = require("../models/Goal");
const Race = require("../models/Race");
const Club = require("../models/Club")
const User = require('../models/User')

module.exports = {
addFriend: async (req,res) =>{
    try {
        await User.findOneAndUpdate({_id: req.user.id}, 
            {$addToSet: {friends: req.params.id}})
        console.log('Added Friend')
        res.redirect('/friends')
    } catch (err) {
        console.log(err)
    }
},
// Removes follower from 'friends.ejs'
removeFriend: async (req,res) =>{
    try {
        await User.findOneAndUpdate({_id: req.user.id}, 
            {$pull: {friends: req.params.id}})
        console.log('Deleted Friend')
        res.redirect('/friends')
    } catch (err) {
        console.log(err)
    }
},
}