require('dotenv').config();
const express = require("express");
const signupRouter = express.Router();
const bcrypt = require("bcrypt");

const signupModel = require("../models/userdataModel");


signupRouter.post("/", async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    let emailExists = await signupModel.findOne({ email });
    if (emailExists) {
      res.status(401).send("Email already exists");
    } else {
      const salt = await bcrypt.genSalt();
      const hashedPwd = await bcrypt.hash(password, salt);
      console.log(hashedPwd);
      const newUserdetails = await new signupModel({
        email,
        firstname,
        lastname,
        passwordHash: hashedPwd
      }).save();
      console.log(newUserdetails);
      res.status(200).json({
        newUserdetails
      });
    }
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .send("Internal Server Error occurred while registering the User..!");
  }
});

module.exports = signupRouter;