const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const UrlSchema = new Schema({
  urlCode: String,
  longUrl: String,
  shortUrl: String,
  datetime: {
    type: Date,
    default: Date.now()
  }
});

const Url = model("url", UrlSchema);

module.exports = Url;