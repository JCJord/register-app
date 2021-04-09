const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const path = require("path");
const con = require("./models/db");
const routes = require("./routes/admin");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
require("./config/auth")(passport);
app.use(
  session({
    secret: "saveData",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  next();
});

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
con();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.use("/", routes);

const PORT = 8082;
app.listen(PORT, () => {
  console.log("connected to port 8082");
});
