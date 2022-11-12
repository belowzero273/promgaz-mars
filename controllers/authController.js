const User = require("../models/User");
const jwt = require("jsonwebtoken");
const lang = require("../json/language.json")

// handle errors
const handleErros = (err) => {
  // console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // incorrect email
  if (err.message === "incorrect email") {
    errors.email = "that email is not registred";
  }

  // incorrect password
  if (err.message === "incorrect password") {
    errors.password = "that password is didn't match";
  }

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registed";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "supersecretsecret", { expiresIn: maxAge }); // create and sign a token
};


module.exports.root_get = (req, res) => {
  res.cookie("language", "en", { httpOnly: false, maxAge: maxAge * 1000 });
  res.redirect("main");
};

module.exports.signup_get = (req, res) => {
  res.cookie("language", "en", { httpOnly: false, maxAge: maxAge * 1000 });
  res.render("signup", { lang: lang[req.cookies.language] });
};

module.exports.login_get = (req, res) => {
  res.cookie("language", "en", { httpOnly: false, maxAge: maxAge * 1000 });
  res.render("login", { lang: lang[req.cookies.language] });
};

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErros(err);
    res.status(400).json({ errors });
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.cookie("language", "en", { httpOnly: false, maxAge: maxAge * 1000 });
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErros(err);
    res.status(400).json({ errors });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1});
  res.redirect("/");
};