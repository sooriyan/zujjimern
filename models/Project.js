const mongoose = require('mongoose');
const ProjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'admin',
  },
  bedroom: {
    type: Number,
  },
  sqft: {
    type: Number,
  },
  facing: {
    type: String,
  },
  link: {
    type: String,
  },
  location: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = Project = mongoose.model('project', ProjectSchema);
