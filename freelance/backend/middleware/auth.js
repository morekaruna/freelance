const jwt = require('jsonwebtoken');
module.exports = function(req,res,next){
  const token = req.header('Authorization')?.split(' ')[1];
  if(!token) return res.status(401).json({error:'No token'});
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  }catch(e){ res.status(401).json({error:'Invalid token'}); }
};
