require('dotenv').config()
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_KEY, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: "shortnerurlapp"
});

const db = mongoose.connection;

db.on("error", (error) => {
  console.log("MongoDB Connection error");
  console.error(error);
});

db.once("open", function () {
  console.log("Mongo Connection established...");
});

module.exports = db;
