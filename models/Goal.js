const mongoose = require('mongoose')

//the information that we'll get back about users for their profile from google using google auth for logins.
const GoalSchema = new mongoose.Schema({
    goal: {
        type: String,
    },
    body: {
        type: String,
        $substr: ["$body", 0, 50]
    },
    completed: {
        type: Boolean,
        default: false,
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
})

module.exports = mongoose.model('Goal', GoalSchema)