const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json")
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");

router.get("/passwordrecover", function (req, res) {
  userAgent = req.get("user-agent"); // get user agent
  let result = userAgent.includes("Mozilla"); // check if browser contains "Ipad"

  res.render("vuln_js", {
    // if access is true, render "vuln_browser_agent" with this condition
    access: "",
    lang: lang[req.cookies.language]
  });
});

router.post("/passwordrecover", async function (req, res) {
  const token = req.cookies.jwt;
  let decoded = jwt.verify(token, "supersecretsecret");
  let currentID = await User.findById(decoded.id);
  // console.log(currentID.password);
  currentPhrase = req.body.phrase;

  if ((req.body.phrase == "uryc!") && (req.body.token == "help!")) {
    achievementUnlocked(jwt.decode(req.cookies.jwt).id, "client_side_security");     // send id from token and challenge name
    res.render("vuln_js", {
      access: "valid",
      hash: currentID.password,
      lang: lang[req.cookies.language]
    })}
  else {
    res.render("vuln_js", {
      access: "invalid",
      lang: lang[req.cookies.language]
  })}
});

module.exports = router;
