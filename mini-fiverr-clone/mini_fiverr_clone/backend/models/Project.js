const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  budget: Number,
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['open','in_progress','completed','closed'], default: 'open' }
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
