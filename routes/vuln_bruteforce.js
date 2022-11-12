const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json")
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");

router.get("/account", function (req, res) {
  res.render("vuln_bruteforce", { result: "", lang: lang[req.cookies.language] });
});

router.post("/account", function (req, res) {
  const mysql = require("mysql2");
  username = req.body.username;
  password = req.body.password;

  const sql_request = `SELECT * FROM gazprom_mars.persons WHERE name="${username}" and password="${password}"`;
  // console.log(sql_request);

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
    // if (err) throw err;
    if (result[0]) {
      // console.log("Match!")
      achievementUnlocked(jwt.decode(req.cookies.jwt).id, "brute_force");     // send id from token and challenge name
      res.render("vuln_bruteforce", { result: "valid", lang: lang[req.cookies.language], queryResult: result });
    }
    else {
      // console.log("User not found")
      res.render("vuln_bruteforce", { result: "invalid", lang: lang[req.cookies.language] });
    }

  });
});

module.exports = router;
