const User = require('../models/User');
const Entry = require('../models/Entry');
const Goal = require('../models/Goal');
const Race = require('../models/Race')

module.exports = {
// Get the Login Index Page
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getDashboard: async (req, res) => {
    try {
      const entries = await Entry.find({user: req.user.id});
      const goals = await Goal.find({user: req.user});
      const races = await Race.find({user: req.user});
      // Redirects the user to the dashboard after the post.
      res.render("dashboard", { 
        entries: entries, 
        user: req.user, 
        goals: goals,
        races: races,
      });
  } catch (err){
      console.error(err)
      res.render('error/500')
      }

  },
  getCommunity: async (req, res) => {
    try{
      const entries = await Entry.find({ status: 'public' })
          .populate('entries') 
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
getProfile: async (req, res) => {
  try {
    const user = await Entry.find({user: req.params.user})
    const entries = await Entry.find({
      user: req.params.userId,
      status: 'public',
    })
      .populate('user')
      .sort({ createdAt: 'desc'})
      .lean()
    // Using the index page we already built and passing in different information
    res.render('profile', {
      entries: entries, 
      user: user
     
    })
    console.log(`the user is ${user}`)
  } catch (err){
    console.log(err);
  }
},
};
