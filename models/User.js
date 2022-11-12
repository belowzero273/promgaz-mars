const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
    unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minLength: [6, "Minimum password length is 6 characters"],
  },
  os_command_injection: {
    type: Boolean,
    default: false
  },
  brute_force: {
    type: Boolean,
    default: false
  },
  local_files_inclusion: {
    type: Boolean,
    default: false
  },
  file_upload_tamper: {
    type: Boolean,
    default: false
  },
  sql_injection: {
    type: Boolean,
    default: false
  },
  dom_xss_injection: {
    type: Boolean,
    default: false
  },
  reflectied_xss_injection: {
    type: Boolean,
    default: false
  },
  stored_xss_injection: {
    type: Boolean,
    default: false
  },
  client_side_security: {
    type: Boolean,
    default: false
  },
  web_parameter_tamper: {
    type: Boolean,
    default: false
  }
});

// fire a function after doc saved to db
userSchema.post("save", function (doc, next) {
  console.log("new user was created & saved", doc);
  next();
});

// fire a functuion before saving
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt)
  next();
});


// static method to login user
userSchema.statics.login = async function (email, password) {  // custom "login" function
  const user = await this.findOne({ email: email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email")
}

const User = mongoose.model("user", userSchema);

module.exports = User;
