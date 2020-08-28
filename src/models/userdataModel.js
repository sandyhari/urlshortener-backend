const mongoose = require("mongoose");

const { Schema, model } = mongoose;

const SignupSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  firstname:{
      type:String,
      required:true
  },
  lastname:String,
  passwordHash: {
    type: String,
    required: true
  }
});

const Signup = model("Signup", SignupSchema);

module.exports = Signup;
