const express = require("express");
const loginModel = require("../models/userdataModel");

const { compareHash } = require("../hashingservices/hash");
const { createToken } = require("../hashingservices/jwtManger");

const loginRouter = express.Router();

loginRouter
  .get("/:useremail", async (req, res) => {
    try {
      const { useremail } = req.params;
      const customer = await loginModel.findOne({ email: useremail });
      console.log(customer);
      if (customer) {
        console.log("sending 200");
        return res.status(200).json({ customer });
      } else {
        res.status(401).send("Internal Server Error..!");
      }
    } catch (error) {
      console.error(error);
      res.status(401).send("Unable to fetch user details..!");
    }
  })

  .post("/", async (req, res) => {
    try {
      const { email, password } = req.body;
      let emailExists = await loginModel.findOne({ email });
      if (emailExists !== null) {
        console.log("restricted");
        let passwordMatch = await compareHash(
          password,
          emailExists.passwordHash
        );
        if (passwordMatch) {
          const jwtToken = createToken({
            type: "admin",
            subject: "admin",
            email
          });
          console.log(jwtToken);

          res.cookie("jwt", jwtToken, {
            httpOnly: true,
            secure: true
          });

          res.status(200).json({
            status: "SUCCESS",
            jwtToken
          });
        } else {
          res.status(400).send("Invalid User");
        }
      } else {
        res.status(400).send("Invalid User");
      }
    } catch (e) {
      console.error(e);
      res
        .status(500)
        .send("Internal Server Error occurred while logging in..!");
    }
  })
  .get("/logout", (req, res) => {
    console.log("logging out");
    res.clearCookie("jwt");
    res.redirect("/user/login");
  });

module.exports = loginRouter;