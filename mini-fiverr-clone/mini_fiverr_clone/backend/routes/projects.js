const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// list projects
router.get('/', async (req,res)=>{
  const projects = await Project.find().populate('client','name email');
  res.json(projects);
});

// create project (client only)
router.post('/', auth, async (req,res)=>{
  if(req.user.role !== 'client') return res.status(403).json({message:'Only clients can post'});
  const {title,description,budget} = req.body;
  const p = new Project({title,description,budget,client:req.user._id});
  await p.save();
  res.json(p);
});

// get single project
router.get('/:id', async (req,res)=>{
  const p = await Project.findById(req.params.id).populate('client','name email');
  if(!p) return res.status(404).json({message:'Not found'});
  res.json(p);
});

module.exports = router;
