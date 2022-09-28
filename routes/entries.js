const express = require("express");
const router = express.Router();
const entriesController = require("../controllers/entries");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Entry = require("../models/Entry");

//Entries Routes - simplified for now
router.get("/:id", ensureAuth, entriesController.getEntry);

router.get("/", ensureAuth, entriesController.getCommunity);

router.get('/user/:userId', ensureAuth, entriesController.getDashboard)

router.post('/add', ensureAuth, entriesController.createEntry)

router.put("/likeEntry/:id", entriesController.likeEntry);

router.delete("/deleteEntry/:id", entriesController.deleteEntry);

module.exports = router;