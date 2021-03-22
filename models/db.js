const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/Users", {});

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: true,
  },
  fullName: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

const Users = mongoose.model("users", userSchema);

new Users({
  email: "asdas@c.com",
  fullName: "Algust von abertenrich",
  password: "sadasopdksagermany",
})
  .save()
  .then(() => {
    console.log("data saved");
  })
  .catch((err) => {
    console.log("error occured" + err);
  });
