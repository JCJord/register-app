const localStrategy = require("passport-local");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("../models/model");
const User = mongoose.model("Users");

module.exports = function (passport) {
  passport.use(
    new localStrategy(
      { usernameField: "email", passwordField: "password" },

      (email, password, done) => {
        User.findOne({ email: email }).then((user) => {
          if (!user) {
            return done(null, false, {
              message: "This account does not exist",
            });
          }

          bcrypt.compare(password, user.password, (error, match) => {
            if (match) {
              return done(null, user);
            } else {
              return done(null, false, { message: "Incorrect password" });
            }
          });
        });
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.serializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
};
