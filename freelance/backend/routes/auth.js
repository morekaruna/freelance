const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
router.post('/register', async (req,res)=>{
  try{
    const { name,email,password,role } = req.body;
    if(!name||!email||!password) return res.status(400).json({error:'Missing fields'});
    const existing = await User.findOne({email});
    if(existing) return res.status(400).json({error:'Email exists'});
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    const u = new User({name,email,password:hash,role});
    await u.save();
    const token = jwt.sign({id:u._id, role:u.role}, process.env.JWT_SECRET || 'secret',{expiresIn:'7d'});
    res.json({token, user:{id:u._id,name:u.name,email:u.email,role:u.role}});
  }catch(e){ res.status(500).json({error:e.message}); }
});
router.post('/login', async (req,res)=>{
  try{
    const { email,password } = req.body;
    const u = await User.findOne({email});
    if(!u) return res.status(400).json({error:'Invalid credentials'});
    const match = await bcrypt.compare(password,u.password);
    if(!match) return res.status(400).json({error:'Invalid credentials'});
    const token = jwt.sign({id:u._id, role:u.role}, process.env.JWT_SECRET || 'secret',{expiresIn:'7d'});
    res.json({token, user:{id:u._id,name:u.name,email:u.email,role:u.role}});
  }catch(e){ res.status(500).json({error:e.message}); }
});
module.exports = router;
