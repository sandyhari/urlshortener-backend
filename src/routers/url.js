require("../config/db");
const express = require("express");
let ObjectId = require("mongoose").Types.ObjectId;

const validUrl = require("valid-url"); //for URL validation
const shortid = require("shortid"); // generating short url

const urlModel = require("../models/url");
const UrlRouter = express.Router();

// @post request to short the url


UrlRouter.get("/data", async (req, res) => {
  try {
    const alldatatimes = await urlModel.find({}, { datetime: 1, _id: 0 });
    console.log(alldatatimes);
    res.status(200).json({ alldatatimes });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
})
  .get("/:getuserdetails", async (req, res) => {
    try {
      const { getuserdetails } = req.params;
      const contents = await urlModel.find({
        emailid: new ObjectId(getuserdetails)
      });
      res.status(200).json({ contents });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  })
  .post("/shorten", async (req, res) => {
    console.log("request we got : " + JSON.stringify(req.body));

    const { longUrl, emailid } = req.body;

    if (longUrl && emailid !== "") {
      console.log("should not enter");
      // grabbing the customers long base url from req.body
      const basedomainURL = process.env.URLDOMAINNAME; //http://localhost:8000 or hosted-personal-domain-name

      const urlCode = shortid.generate();

      if (!validUrl.isUri(basedomainURL)) {
        res.status(401).send("Not Valid Base Domain URL provided.!");
      }
      if (!validUrl.isUri(longUrl)) {
        res.status(401).send("Not Valid URL provided from request.!");
      } else {
        try {
          let resultant = await urlModel.findOne({ longUrl });
          if (resultant) {
            console.log("ShortHand - already - Exists");
            res.status(200).json({ resultant });
          } else {
            const shortenedurl = `${basedomainURL}/redirect/${urlCode}`;
            resultant = new urlModel({
              urlCode,
              longUrl,
              shortUrl: shortenedurl,
              emailid
            });
            await resultant.save();
            console.log("created new Shorthand", resultant);
            res.status(200).json({ resultant });
          }
        } catch (e) {
          console.error(e);
          res.status(500).send("Internal Server Error!");
        }
      }
    } else {
      console.log("error message");
      res.status(401).send("Session expired..!");
    }
  });
module.exports = UrlRouter;









// UrlRouter.get("/getuserdetails", async (req, res) => {

//   if(!!req.admin){
//      try {
//           console.log("....fetching user data...");
//           const contents = await urlModel.find({});
//           res.status(200).json({ contents });
//       } catch (error) {
//           console.log(error);
//           res.status(500).send("Internal server error");
//       }
//   }
//   else{
//     res.status(401).send("User not logged in");
//   }
// }).post("/shorten", async (req, res) => {
//   if (!!req.admin) {
//      console.log("request we got : " + JSON.stringify(req.body));

//       const { longUrl, emailid } = req.body; // grabbing the customers long base url from req.body
//       const basedomainURL = process.env.URLDOMAINNAME; //http://localhost:8000 or hosted-personal-domain-name

//       const urlCode = shortid.generate();

//       if (!validUrl.isUri(basedomainURL)) {
//         res.status(401).send("Not Valid Base Domain URL provided.!");
//       }
//       if (!validUrl.isUri(longUrl)) {
//         res.status(401).send("Not Valid URL provided from request.!");
//       } else {
//     try {
//         let resultant = await urlModel.findOne({ longUrl });
//         if (resultant) {
//           console.log("ShortHand - already - Exists");
//           res.status(200).json(resultant);
//         } else {
//           const shortenedurl = `${basedomainURL}/redirect/${urlCode}`;
//           resultant = new urlModel({
//             urlCode,
//             longUrl,
//             shortUrl: shortenedurl,
//             emailid
//           });
//           await resultant.save();
//           console.log("created new Shorthand", resultant);
//           res.status(200).json(resultant);
//         }
//       } catch (e) {
//         console.error(e);
//         res.status(500).send("Internal Server Error!");
//       }
//     }
//   }else{
//     res.status(401).send("User not logged in");
//   }
// });

// module.exports = UrlRouter;
