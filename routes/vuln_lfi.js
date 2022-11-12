const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json");
const fs = require("fs");
const path = require('path')
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");

router.get("/files", function (req, res) {
  res.render("vuln_lfi.ejs", {
    file: null,
    access: "",
    lang: lang[req.cookies.language],
  });
});

router.post("/files", async function (req, res) {
  const filename = req.body.filename;
  fullPath = path.join(__dirname, '../') + filename;
  // console.log(fullPath);
  if (fullPath.includes("../../../")) {                                          //  check for stuff like ../../../../../etc/passwd - read paswd                                 
    fs.readFile(path.join(__dirname, '../') + filename, "utf8", (err, data) => {
      achievementUnlocked(jwt.decode(req.cookies.jwt).id, "local_files_inclusion");     // send id from token and challenge name
      res.render("vuln_lfi.ejs", {
        file: data,
        access: "hacked",
        lang: lang[req.cookies.language]
      })
    });
  } else {
    fs.readFile(path.join(__dirname, '../') + filename, "utf8", (err, data) => {
      res.render("vuln_lfi.ejs", {
        file: data,
        access: "",
        lang: lang[req.cookies.language]
      })
    })
  };

});



module.exports = router;
