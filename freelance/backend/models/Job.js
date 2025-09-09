const mongoose = require('mongoose');
const JobSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  budget: Number,
  deadline: Date,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Job', JobSchema);
