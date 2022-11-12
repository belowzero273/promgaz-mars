const jwt = require("jsonwebtoken");
const User = require("../models/User")


// Function checks for valid token
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "supersecretsecret", (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        res.redirect("/login");
      } else {
        // console.log(decodedToken);
        next();
      }
    });
  } else {
    // console.log("no token found");
    res.redirect("/login");
  }
};


// Function checks current user
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, "supersecretsecret", async (err, decodedToken) => {
      if (err) {
        // console.log(err.message);
        res.locals.user = null;
        next();
      } else {
        // console.log(decodedToken);
        let user = await User.findById(decodedToken.id);
        res.locals.user = user;
        next();
      }
  })}
  else {
    res.locals.user = null;
    next();
  }

}


module.exports = { requireAuth, checkUser };