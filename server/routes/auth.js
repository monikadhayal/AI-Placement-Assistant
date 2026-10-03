const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const protect = require("../middleware/auth.js");

// register

router.post('/register',async(req,res) =>{
    const {name, email, password, targetRole} = req.body;
    const existingUser = await User.findOne({email: email});
    
    if(existingUser) {
        return res.status(409).json({
            message: "Email already registered",
        });
        }
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await User.create({name,email,passwordHash, targetRole});
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7h' });
      if (newUser) {
        res.status(201).json({
            message:"User created",user: newUser,token:token});
      }  
})
//login

router.post('/login', async(req,res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(401).json({
            message: "Invalid email"
        });
    }
    const isMatch  = await bcrypt.compare(password, user.passwordHash);
    if(!isMatch){
        return res.status(401).json({
          message: "Invalid email or password",
        });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7h' });
    res.status(200).json({ 
        
        message: "Login successful" ,token:token});
    
})

router.get("/me", protect, (req, res) => {
  res.json({ message: "You are logged in", userId: req.userId });
});

module.exports = router;