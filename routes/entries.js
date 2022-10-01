const express = require("express");
const router = express.Router();
const entriesController = require("../controllers/entries");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Entry = require("../models/Entry");

//Entries Routes - simplified for now

router.post("/add", ensureAuth, entriesController.createEntry);

router.get("/:id", ensureAuth, entriesController.getEntry);

router.get("/:id", ensureAuth, entriesController.getEditPage);

router.patch("/editEntry/:id/", entriesController.updateEntry);

//router.put("/:id", entriesController.updateEntry);

router.delete("/deleteEntry/:id", entriesController.deleteEntry);

module.exports = router;