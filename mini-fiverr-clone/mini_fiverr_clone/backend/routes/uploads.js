const express = require('express');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');
const Contract = require('../models/Contract');

const router = express.Router();

// ensure uploads dir exists
const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/:contractId', auth, upload.single('file'), async (req, res) => {
  // optionally: verify contract exists and user is part of it
  const contract = await Contract.findById(req.params.contractId);
  if(!contract) return res.status(404).json({ message: 'Contract not found' });

  // You can add more checks: only client or freelancer in contract can upload
  res.json({ file: req.file.filename, path: '/uploads/' + req.file.filename });
});

module.exports = router;
