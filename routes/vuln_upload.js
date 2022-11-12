const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json");
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");
const fs = require("fs");
const path = require('path');
const ALLOWED_EXTENSIONS = ["pdf"];
const PICTURE_EXTENSIONS = ["png", "gif", "jpg", "jpeg", "bmp"]

const allowed_file = (filename) => {
  const extension = filename.split(".")[1];
  return ALLOWED_EXTENSIONS.includes(extension);
};

const isPicture = (filename) => {
  const arr = filename.split(".");
  const extension = arr[arr.length - 1];
  return PICTURE_EXTENSIONS.includes(extension);
};

router.get("/resume", function (req, res) {
  res.render("vuln_upload.ejs", {
    file: null,
    result: "",
    lang: lang[req.cookies.language],
  });
});

router.post("/resume", async function (req, res) {

  if (req.files) {
    const file = req.files.file;
    const filePath = path.join(__dirname, '../public/upload/') + file.name;
    if (file && allowed_file(file.name) && isPicture(file.name)) {
      file.mv(filePath, async (err) => {
        achievementUnlocked(jwt.decode(req.cookies.jwt).id, "file_upload_tamper");     // send id from token and challenge name
        res.render("vuln_upload.ejs", { result: "hacked", lang: lang[req.cookies.language], file: path.basename(filePath) });
      })
    } else if (file && allowed_file(file.name)) {
      file.mv(filePath, async (err) => {
        res.render("vuln_upload.ejs", { result: "success", lang: lang[req.cookies.language], file: path.basename(filePath) });
      })
    } else {
      res.render("vuln_upload.ejs", { result: "noallowed", lang: lang[req.cookies.language] });
    }
  }
  else {
    res.render("vuln_upload.ejs", { result: "no-resume", lang: lang[req.cookies.language] });
  }
});

module.exports = router;