const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goals");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/:id", ensureAuth, goalController.createGoal);

router.put('/markComplete', goalController.markComplete)

router.put('/markIncomplete', goalController.markIncomplete)

router.delete("/deleteGoal/:id", goalController.deleteGoal);


module.exports = router;