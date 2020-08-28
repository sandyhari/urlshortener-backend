require('dotenv').config();
const express = require("express");
const fpwdRouter = express.Router();

const fpwdModel = require("../models/userdataModel");

fpwdRouter.post("/",async (req,res)=>{
    try{
        const {email} = req.body;
        let emailExists = await fpwdModel.findOne({email});
            if(emailExists){
                res.status(201).json("UserExists..!");
            }
            else{
                res.status(400).json("No Such User exists, Check ur email ID..!");
            }
        }
        catch(e){
            console.error(e);
            res.status(500).json("Internal Server Error occurred while Changing the Password..!");
        }
})

module.exports = fpwdRouter;