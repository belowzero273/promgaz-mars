const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json");
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");

router.get("/guestbook", function (req, res) {
  const mysql = require("mysql2");

  const sql_request = "SELECT * FROM gazprom_mars.guestbook";

  var con = mysql.createConnection({
    host: "localhost",
    user: "belowzero273",
    password: "password123",
  });

  con.connect(function (err) {
    if (err) throw err;
    // console.log("Connected!");
  });

  con.query(sql_request, function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.render("vuln_xss_stored", {
      queryResults: result,
      result: "",
      lang: lang[req.cookies.language],
    });
  });
});

router.post("/guestbook", function (req, res) {
  const mysql = require("mysql2");
  let newName = req.body.name;
  let newPost = req.body.record;
  const checkXSS = /.*<script>alert\(.*\)<\/script>.*/.test(newPost);       // check newPost string if it maches typical XSS pattern

  const sql_request_insert = `INSERT INTO gazprom_mars.guestbook VALUES ('${newName}', '${newPost}')`;
  const sql_request_select = "SELECT * FROM gazprom_mars.guestbook";

  var con = mysql.createConnection({
    host: "localhost",
    user: "belowzero273",
    password: "password123",
  });

  con.connect(function (err) {
    if (err) throw err;
    //  console.log("Connected!");
  });

  con.query(sql_request_insert);

  con.query(sql_request_select, function (err, result) {
    if (err) throw err;
    else if (checkXSS == true) {
      achievementUnlocked(jwt.decode(req.cookies.jwt).id, "stored_xss_injection");     // send id from token and challenge name
      res.render("vuln_xss_stored", {
        queryResults: result,
        result: "valid",
        lang: lang[req.cookies.language],
      });
    } else if (checkXSS == false) {
      res.redirect("guestbook");
    }
  });
});

router.post("/guestbookclear", async function (req, res) {
  const mysql = require("mysql2");

  const sql_request = "DELETE FROM gazprom_mars.guestbook"; // replace with drop

  var con = mysql.createConnection({
    host: "localhost",
    user: "belowzero273",
    password: "password123",
  });

  con.connect(function (err) {
    if (err) throw err;
    //  console.log("Connected!");
  });

  con.query(sql_request, function (err, result) {
    if (err) throw err;
    //   console.log(result);
    res.redirect("guestbook");
  });
});

module.exports = router;
