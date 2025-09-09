const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Contract = require('../models/Contract');

router.get('/', auth, async (req,res)=>{
  const contracts = await Contract.find({ $or: [ {client: req.user._id}, {freelancer: req.user._id} ] })
    .populate('project').populate('bid');
  res.json(contracts);
});

module.exports = router;
