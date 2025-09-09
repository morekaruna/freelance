const mongoose = require('mongoose');

const contractSchema = new mongoose.Schema({
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  bid: { type: mongoose.Schema.Types.ObjectId, ref: 'Bid' },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  freelancer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['active','completed','cancelled'], default: 'active' }
}, { timestamps: true });

module.exports = mongoose.model('Contract', contractSchema);
