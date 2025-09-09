const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Bid = require('../models/Bid');
const Project = require('../models/Project');
const Contract = require('../models/Contract');

// place bid on project
router.post('/:id/bids', auth, async (req,res)=>{
  if(req.user.role !== 'freelancer') return res.status(403).json({message:'Only freelancers can bid'});
  const project = await Project.findById(req.params.id);
  if(!project) return res.status(404).json({message:'Project not found'});
  const {amount,coverLetter} = req.body;
  const bid = new Bid({project:project._id, freelancer:req.user._id, amount, coverLetter});
  await bid.save();
  res.json(bid);
});

// list bids for a project
router.get('/:id/bids', auth, async (req,res)=>{
  const bids = await Bid.find({project:req.params.id}).populate('freelancer','name email');
  res.json(bids);
});

// client accepts a bid -> create contract
router.post('/:id/accept/:bidId', auth, async (req,res)=>{
  const project = await Project.findById(req.params.id);
  if(!project) return res.status(404).json({message:'Project not found'});
  if(project.client.toString() !== req.user._id.toString()) return res.status(403).json({message:'Only owner can accept'});
  const bid = await Bid.findById(req.params.bidId);
  if(!bid) return res.status(404).json({message:'Bid not found'});
  bid.accepted = true;
  await bid.save();
  project.status = 'in_progress';
  await project.save();
  const contract = new Contract({
    project: project._id,
    bid: bid._id,
    client: req.user._id,
    freelancer: bid.freelancer
  });
  await contract.save();
  res.json({contract});
});

module.exports = router;
