const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json")
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");

router.get("/language", function (req, res) {
  selectedLanguage = req.query.language;
  const checkXSS = /alert\(.*\)/.test(selectedLanguage);       // check selectedLanguage string if it maches typical XSS pattern

  if (!selectedLanguage) {
    res.render("vuln_xss_dom", { result: "valid", lang: lang[req.cookies.language] });
  }
  else if (checkXSS == true) {
    achievementUnlocked(jwt.decode(req.cookies.jwt).id, "dom_xss_injection");     // send id from token and challenge name
    res.render("vuln_xss_dom", { result: "hacked", lang: lang[req.cookies.language] })
  }
});

module.exports = router;
