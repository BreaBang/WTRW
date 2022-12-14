const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const homeController = require("../controllers/home");
const entriesController = require("../controllers/entries");
const commentsController = require("../controllers/comments");
const goalController = require("../controllers/goals");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

//Main Routes - simplified for now
router.get("/", homeController.getIndex);
router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/logout", authController.logout);
router.get("/signup", authController.getSignup);
router.post("/signup", authController.postSignup);
router.get("/dashboard", ensureAuth, homeController.getDashboard);
router.get("/community", ensureAuth, homeController.getCommunity);
router.get("/add", ensureAuth, entriesController.getAddPage);
router.post("/createComment/:id", commentsController.createComment);
router.get("/:userId", ensureAuth, homeController.getProfile);
router.get("/buddies", ensureAuth, homeController.getBuddies);



module.exports = router;
