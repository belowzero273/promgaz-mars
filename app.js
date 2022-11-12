const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const { requireAuth, checkUser } = require("./middleware/authMiddleware")
// languages
const lang = require("./json/language.json")

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: false}));
app.use(express.urlencoded({extended: true}));
app.use(fileUpload({ uriDecodeFileNames: true }));

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI = "mongodb://localhost:27017/node-auth";

mongoose.set('useFindAndModify', false);
mongoose
  .connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
// app.get("/", requireAuth, (req, res) => res.redirect("main"));
app.get("/main", requireAuth, (req, res) => res.render("main", { lang: lang[req.cookies.language], currentLang: req.cookies.language }));
app.get('/scoreboard', requireAuth, require('./routes/scoreboard'));   


// vulnerabilities
app.get("/account", requireAuth, require('./routes/vuln_bruteforce'));
app.post("/account", checkUser, require('./routes/vuln_bruteforce'));
app.get("/files", requireAuth, require('./routes/vuln_lfi'));
app.post("/files", checkUser, require('./routes/vuln_lfi'));
app.get("/resume", requireAuth, require('./routes/vuln_upload'));
app.post("/resume", checkUser, require('./routes/vuln_upload'));
app.get("/searchbyid", requireAuth, require('./routes/vuln_sqli'));
app.get("/language", requireAuth, require('./routes/vuln_xss_dom'));
app.get("/search", requireAuth, require('./routes/search'));
app.get("/chat", requireAuth, require('./routes/vuln_xss_reflected'));
app.post("/guestbook", checkUser, require('./routes/vuln_xss_stored'));
app.post("/guestbookclear", checkUser, require('./routes/vuln_xss_stored'));
app.get("/guestbook", requireAuth, require('./routes/vuln_xss_stored'));
app.get("/lookup", requireAuth, require('./routes/vuln_os_injection'));
app.post("/lookup", checkUser, require('./routes/vuln_os_injection'));
app.get("/passwordrecover", requireAuth, require('./routes/vuln_js'));
app.post("/passwordrecover", checkUser, require('./routes/vuln_js'));           
app.get('/adminaccess', requireAuth, require('./routes/vuln_browser_agent'));   

app.use(authRoutes);

