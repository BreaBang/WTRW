const express = require("express");
const router = express.Router();
const entriesController = require("../controllers/entries");
const { ensureAuth, ensureGuest } = require("../middleware/auth");
const Entry = require("../models/Entry");
const upload = require("../middleware/multer");

//Entries Routes - simplified for now

router.post("/add", upload.single("file"), ensureAuth, entriesController.createEntry);

router.get("/:id", ensureAuth, entriesController.getEntry);

router.get("/:id", ensureAuth, entriesController.getEditPage);

router.patch("/editEntry/:id/", entriesController.updateEntry);

//router.put("/:id", entriesController.updateEntry);

router.delete("/deleteEntry/:id", ensureAuth, entriesController.deleteEntry);

module.exports = router;