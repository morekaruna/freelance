const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

module.exports = async function(req,res,next){
  const header = req.headers['authorization'];
  const token = header && header.split(' ')[1];
  if(!token) return res.status(401).json({message:'No token'});
  try{
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(payload.id).select('-password');
    next();
  }catch(err){
    return res.status(401).json({message:'Invalid token'});
  }
}
