const mongoose = require('mongoose')

//the information that we'll get back about users for their profile from google using google auth for logins.
const EntrySchema = new mongoose.Schema({
    title: {
        type: String,
        //required: true
    },
    body: {
        type: String,
        //required: true
    },
    status: {
        type: String,
        defualt: 'public',
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
    }
})

/* Passing in a new model for story */
module.exports = mongoose.model('Entry', EntrySchema)