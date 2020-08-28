const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const TempPWDtokenSchema = new Schema({
  randomToken: {
    type: String,
    required: true
  }
});

const tempPWD = model("tempPWD", TempPWDtokenSchema);

module.exports = tempPWD;
