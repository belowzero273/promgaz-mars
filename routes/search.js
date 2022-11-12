const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json")
const eastereggs = require("../json/eastereggs.json")
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");


router.get("/search", function (req, res) {
  if (eastereggs[req.query.search.toLowerCase()] == null) {
    res.render("search", { result: req.query.search, response: null, lang: lang[req.cookies.language] });
  } 
  else {
    res.render("search", { result: req.query.search, response: eastereggs[req.query.search.toLowerCase()], lang: lang[req.cookies.language] });
  }
  
});

module.exports = router;
