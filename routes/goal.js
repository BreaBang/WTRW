const express = require("express");
const router = express.Router();
const goalController = require("../controllers/goals");
const { ensureAuth, ensureGuest } = require("../middleware/auth");

router.post("/:id", ensureAuth, goalController.createGoal);

router.delete("/deleteComment/:id/:goalid", goalController.deleteGoal);


module.exports = router;