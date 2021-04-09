//ADMIN
const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
require("../models/model");
const User = mongoose.model("Users");
const bcrypt = require("bcryptjs");
const passport = require("passport");

router.get("/", (req, res) => {
  res.render(__dirname + "/../views/layouts/index");
});

router.get("/signup", (req, res) => {
  res.render(__dirname + "/../views/layouts/register");
});

router.get("/login", (req, res) => {
  res.render(__dirname + "/../views/layouts/login");
});

router.post("/signup/add", (req, res) => {
  var errors = [];
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  if (!username || username == undefined || username == null) {
    errors.push({ text: "Username is not valid" });
  }
  if (username.length < 3) {
    errors.push({ text: "Username must have at least 3 characters" });
  }
  if (username.length > 20) {
    errors.push({ text: "Username must not exceed 20 character" });
  }

  if (!email || email == undefined || email == null || email.length > 254) {
    errors.push({ text: "E-mail is not valid" });
  }
  if (password.length < 10) {
    errors.push({ text: "Password must have at least 10 characters" });
  }
  if (password.length > 100) {
    errors.push({ text: "password too long" });
  }
  if (!password || password == undefined || password == null) {
    errors.push({ text: "Password is not valid" });
  }

  if (errors.length > 0) {
    res.render(__dirname + "/../views/layouts/register", { errors: errors });
  } else {
    User.findOne({ email: email })
      .then((user) => {
        if (user) {
          req.flash("error_msg", "E-mail already taken");
          res.redirect("/signup");
        } else {
          const addUser = {
            email: email,
            username: username,
            password: password,
          };

          bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(addUser.password, salt, (error, hash) => {
              if (error) {
                req.flash("error_msg", "User could not be saved");
                res.redirect("/");
              }

              addUser.password = hash;

              new User(addUser)
                .save()
                .then(() => {
                  req.flash("success_msg", "Successfully registered");
                  res.redirect("/login");
                })
                .catch((err) => {
                  req.flash("error_msg", "Could not create user");
                  res.redirect("/signup");
                });
            });
          });
        }
      })
      .catch((err) => {
        req.flash("error_msg", "Error occurred ");
        res.redirect("/");
      });
  }
});

router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  });
});

module.exports = router;
