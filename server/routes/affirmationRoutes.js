// routes/affirmationRoutes.js

const express = require("express");
const router = express.Router();
const { getRandomAffirmation } = require("../utils/affirmations");

// @route   GET /api/affirmation?mood=happy
// @access  Private
router.get("/", (req, res) => {
  const mood = req.query.mood;
  if (!mood) return res.status(400).json({ error: "Mood is required" });

  const affirmation = getRandomAffirmation(mood);
  if (!affirmation) return res.status(404).json({ error: "No affirmation found for that mood" });

  res.json({ affirmation });
});

module.exports = router;
