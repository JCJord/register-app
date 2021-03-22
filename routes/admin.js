const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render(__dirname + "/../views/layouts/register");
});
router.get("/login", (req, res) => {
  res.render(__dirname + "/../views/layouts/login");
});
router.get("/index", (req, res) => {
  res.render(__dirname + "/../views/layouts/index");
});

module.exports = router;
