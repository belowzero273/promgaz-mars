const { Router } = require("express");
const authController = require("../controllers/authController");
const router = Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const lang = require("../json/language.json")
const { achievementUnlocked } = require("./scoreboard_achievementUnlocked");

router.get("/searchbyid", function (req, res) {
  const mysql = require("mysql2");
  if (req.query.id) {
    id = req.query.id;
  }
  else {
    id = 0;
  }

  const sql_request = "SELECT * FROM gazprom_mars.persons where id=" + id;

  var con = mysql.createConnection({
    host: "localhost",
    user: "belowzero273",
    password: "password123",
    multipleStatements: true
  });

  con.connect(function (err) {
    if (err) throw err;
  });

  con.query(sql_request, function (err, result) {

    if (sql_request.includes("1=1;")) {
      achievementUnlocked(jwt.decode(req.cookies.jwt).id, "sql_injection");     // send id from token and challenge name
      res.render("vuln_sqli", { queryResults: result, result: "hacked", lang: lang[req.cookies.language] });
    }


    else if (err) {
      res.render("vuln_sqli", { queryResults: result, result: "", lang: lang[req.cookies.language] });
    }


    else {
      res.render("vuln_sqli", { queryResults: result, result: "valid", lang: lang[req.cookies.language] });
    }
  });
});

module.exports = router;