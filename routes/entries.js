const express = require("express");
const router = express.Router();
const upload = require("../middleware/multer");
const entriesController = require("../controllers/entries");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Entry = require("../models/Entry");

//Post Routes - simplified for now
router.get("/:id", ensureAuth, entriesController.getEntry);

router.post('/add', ensureAuth, entriesController.createEntry)

router.put("/likePost/:id", entriesController.likePost);

router.delete("/deletePost/:id", entriesController.deletePost);

module.exports = router;