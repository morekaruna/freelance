const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

router.post('/register', async (req,res)=>{
  const {name,email,password,role} = req.body;
  try{
    let user = await User.findOne({email});
    if(user) return res.status(400).json({message:'User exists'});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    user = new User({name,email,password:hash,role});
    await user.save();
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token});
  }catch(err){ console.error(err); res.status(500).send('Server error');}
});

router.post('/login', async (req,res)=>{
  const {email,password} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'Invalid creds'});
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch) return res.status(400).json({message:'Invalid creds'});
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn:'7d'});
    res.json({token});
  }catch(err){ console.error(err); res.status(500).send('Server error');}
});

module.exports = router;
