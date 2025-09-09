const express = require('express');
const router = express.Router();
const Bid = require('../models/Bid');
const auth = require('../middleware/auth');
router.post('/:jobId', auth, async (req,res)=>{
  try{
    const { proposal, amount } = req.body;
    const bid = new Bid({ jobId: req.params.jobId, userId: req.user.id, proposal, amount });
    await bid.save(); res.status(201).json(bid);
  }catch(e){ res.status(500).json({error:e.message}); }
});
router.get('/job/:jobId', async (req,res)=>{
  try{ const bids = await Bid.find({jobId:req.params.jobId}).sort({createdAt:-1}); res.json(bids); }
  catch(e){ res.status(500).json({error:e.message}); }
});
router.get('/user/:userId', async (req,res)=>{
  try{ const bids = await Bid.find({userId:req.params.userId}).sort({createdAt:-1}); res.json(bids); }
  catch(e){ res.status(500).json({error:e.message}); }
});
module.exports = router;
