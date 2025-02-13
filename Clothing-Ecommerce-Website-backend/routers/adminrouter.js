const express=require("express");
const adimnmodel = require("../model/adminmodel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const adminrouter=express.Router();


adminrouter.get("/",(req,res)=>{
    res.status(200).json({message:"admin"})
});

adminrouter.post("/addamin",async(req,res)=>{
    try{
        const existEmail = await adimnmodel.findOne({ email: req.body.email });
    
        if (!existEmail) {
          req.body.password = await bcrypt.hash(req.body.password, 10);
          await adimnmodel.create(req.body);
          res.status(201).json({ message: "admin registered successfully" });
        } else {
          res.status(200).json({ message: "This email already exists" });
        }
      } catch (err) {
        res.status(400).json({ message: err });
      }
});



adminrouter.post("/adminlogin", async (req, res) => {


    try {
      const user = await adimnmodel.findOne({ email: req.body.email });
      if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
          const token = jwt.sign({ user }, process.env.SECRET_KEY, {
            expiresIn: "1h",
          });
  
          return res.status(200).json({ message: "login Successfully", token ,email:user.email,name:user.name});
        } else {
          res.status(400).json({ message: "invalid Password" });
        }
      } else {
        res.status(404).json({ message: "invalid email" });
      }
    } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err });
    }
  });

module.exports=adminrouter;