const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const admin = require("./routes/admin");
const path = require("path");

app.engine("handlebars", handlebars({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));
app.use("/", admin);

app.get("/homepage", (req, res) => {
  res.render(__dirname + "/views/layouts/index");
});

const PORT = 8082;
app.listen(PORT, () => {
  console.log("Connected to PORT 8082");
});
