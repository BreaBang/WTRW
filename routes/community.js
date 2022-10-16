const express = require("express");
const router = express.Router();
const communityController = require("../controllers/community");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.get('/profile/:id', homeController.getProfile)
router.get('/profile', homeController.getUserProfile)
router.get('/friends', homeController.getFriends)
