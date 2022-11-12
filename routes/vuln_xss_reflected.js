const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json")
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");

router.get("/chat", function (req, res) {
  userName = req.query.name;
  const checkXSS = /.*<script>alert\(.*\)<\/script>.*/.test(userName);       // check newPost string if it maches typical XSS pattern
  if (checkXSS == true) {
    achievementUnlocked(jwt.decode(req.cookies.jwt).id, "reflectied_xss_injection");     // send id from token and challenge name
    res.render("vuln_xss_reflected", { result: "hacked", name: userName, lang: lang[req.cookies.language] });
  }
  else {
    res.render("vuln_xss_reflected", { result: "valid", name: userName, lang: lang[req.cookies.language] });
  }

});

module.exports = router;
