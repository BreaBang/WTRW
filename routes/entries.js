const express = require("express");
const router = express.Router();
const entriesController = require("../controllers/entries");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Entry = require("../models/Entry");

//Entries Routes - simplified for now
router.get("/dashboard", ensureAuth, entriesController.getDashboard);

router.get("/community", ensureAuth, entriesController.getCommunity);

router.get("/add", ensureAuth, entriesController.getAddPage);

router.post("/add", ensureAuth, entriesController.createEntry);

router.get("/:id", ensureAuth, entriesController.getEntry);

router.get('/', ensureAuth, entriesController.getEditPage)

//router.put("/:id", entriesController.updateEntry);

router.put("/likeEntry/:id", entriesController.likeEntry);

router.delete("/deleteEntry/:id", entriesController.deleteEntry);

module.exports = router;