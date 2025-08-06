const express = require("express");
const router = express.Router();
const { sendResetLink, resetPassword } = require("../controllers/passwordResetController");

router.post("/forgot-password", sendResetLink);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
