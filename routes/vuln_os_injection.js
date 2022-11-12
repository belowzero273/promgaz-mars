const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json")
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");


router.get("/lookup", function (req, res) {
  res.render("vuln_os_injection", {
    result: "",
    lang: lang[req.cookies.language]
  });
});

router.post("/lookup", async function (req, res) {
  const util = require("util");
  const exec = util.promisify(require("child_process").exec);
  targetPing = req.body.target;

  async function pingTarget(param) {
    try {
      const { stdout, stderr } = await exec("ping -c 4 " + param);
//      console.log("stdout:", stdout);
//      console.log("stderr:", stderr);
      return stdout;
    } catch (e) {
      console.error(e); 
    }
  }
  resultPing = await pingTarget(targetPing);

  if (targetPing.includes(";") || targetPing.includes("&")) {           // if command contains ";" or "&"
    achievementUnlocked(jwt.decode(req.cookies.jwt).id, "os_command_injection");     // send id from token and challenge name
    res.render("vuln_os_injection", {
      result: "hacked",
      textPing: resultPing,
      lang: lang[req.cookies.language]
    });
  }
  else {
    res.render("vuln_os_injection", {
      result: "valid",
      textPing: resultPing,
      lang: lang[req.cookies.language]
    });
  }
});

module.exports = router;
