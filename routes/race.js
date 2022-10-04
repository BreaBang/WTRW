const express = require("express");
const router = express.Router();
const raceController = require("../controllers/races");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/:id", ensureAuth, raceController.createRace);

router.put('/markComplete', raceController.markComplete)

router.put('/markIncomplete', raceController.markIncomplete)

router.delete("/deleteGoal/:id", raceController.deleteRace);


module.exports = router;