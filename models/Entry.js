const mongoose = require('mongoose')

//the information that we'll get back about users for their profile from google using google auth for logins.
const EntrySchema = new mongoose.Schema({
    title: {
        type: String,
    },
    goal: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Goal'
    },
    body: {
        type: String,
        $substr: ["$body", 0, 50],
    },
    thoughts: {
        type: String,
    },
    emotions: {
        type: String,
    },
    status: {
        type: String,
        default: 'public',
        enum: ['public', 'private']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'User',
    },
    userName: {
        type: String,  
        ref: 'User',
    },
    createdAt: {
        type: Date,
        default: Date.now  
    },
    comment: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Comment',
    },
    })

/* Passing in a new model for story */
module.exports = mongoose.model('Entry', EntrySchema)