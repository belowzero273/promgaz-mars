const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json")
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");


router.get("/scoreboard", function (req, res) {
  User.find({}, function (err, users) {
    res.render("scoreboard", {
      users: users,
      lang: lang[req.cookies.language]
    });
  });
});

module.exports = router;
