const { Router } = require('express');
const authController = require('../controllers/authController');
const router = Router();
const lang = require("../json/language.json")
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");

router.get("/adminaccess", function (req, res) {
  userAgent = req.get('user-agent');

  if (userAgent.includes("iPad")) {
    achievementUnlocked(jwt.decode(req.cookies.jwt).id, "web_parameter_tamper");     // send id from token and challenge name
    res.render("vuln_browser_agent", {
      access: "hacked",
      lang: lang[req.cookies.language]
    });
  }
  else {
    res.render("vuln_browser_agent", {
      access: null,
      lang: lang[req.cookies.language]
    });
  }


});

module.exports = router;