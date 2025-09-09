const express = require('express');
const router = express.Router();
const Job = require('../models/Job');
const auth = require('../middleware/auth');
router.post('/', auth, async (req,res)=>{
  try{
    const data = req.body; data.userId = req.user.id;
    const job = new Job(data); await job.save(); res.status(201).json(job);
  }catch(e){ res.status(500).json({error:e.message}); }
});
router.get('/', async (req,res)=>{
  try{ const list = await Job.find().sort({createdAt:-1}); res.json(list); }
  catch(e){ res.status(500).json({error:e.message}); }
});
router.get('/:id', async (req,res)=>{
  try{ const j = await Job.findById(req.params.id); res.json(j); }
  catch(e){ res.status(500).json({error:e.message}); }
});
module.exports = router;
