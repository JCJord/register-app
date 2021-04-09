const con = () => {
  const mongoose = require("mongoose");
  mongoose.Promise = global.Promise;

  mongoose
    .connect("mongodb://localhost/User", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("connected to mongodb");
    })
    .catch((err) => {
      console.log("could not connect to mongodb " + err);
    });
};
module.exports = con;
