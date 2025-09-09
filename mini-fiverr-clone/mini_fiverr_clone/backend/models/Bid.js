const mongoose = require('mongoose');

const bidSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  coverLetter: String,
  accepted: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Bid', bidSchema);
