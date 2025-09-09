const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Message = require('../models/Message');

// Send message
router.post('/', auth, async (req, res) => {
  const { receiver, contract, text } = req.body;
  const msg = new Message({ sender: req.user._id, receiver, contract, text });
  await msg.save();
  res.json(msg);
});

// Get messages (by contract)
router.get('/:contractId', auth, async (req, res) => {
  const messages = await Message.find({ contract: req.params.contractId })
    .populate('sender', 'name')
    .populate('receiver', 'name')
    .sort('createdAt');
  res.json(messages);
});

module.exports = router;
