const mongoose = require('mongoose');
const BidSchema = new mongoose.Schema({
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  proposal: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Bid', BidSchema);
