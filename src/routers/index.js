require('dotenv').config();
const express = require("express");
const urlModel = require("../models/url");
const Router = express.Router();

Router.get("/", (req, res) => {
  res.status(200).send("Routed");
}).get("/:urlencoded", async (req, res) => {
  try {
    const { urlencoded } = req.params;
    const urlExists = await urlModel.findOne({ urlCode: urlencoded });
    console.log(urlExists);
    if (urlExists) {
      return res.status(200).redirect(urlExists.longUrl);
    } else {
      res.status(401).send("Not Found ..!");
    }
  } catch (e) {
    console.error(e);
    res.status(500).send("Internal Server Error!");
  }
});

module.exports = Router;
