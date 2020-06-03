const mongoose = require('mongoose');
const request = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  date: {
    type: Date,
    default: Date.now,
  },
  noofrooms: {
    type: Number,
    required: true,
  },
  sqfeet: {
    type: Number,
    required: true,
  },
  planDetails: {
    type: String,
  },
  mbrTheme: {
    type: String,
  },
  mbrSpecialComments: {
    type: String,
  },
  cbrTheme: {
    type: String,
  },
  cbrSpecialComments: {
    type: String,
  },
  gbrTheme: {
    type: String,
  },
  gbrSpecialComments: {
    type: String,
  },
  livingroomTheme: {
    type: String,
  },
  livingroomComments: {
    type: String,
  },
  diningRoomTheme: {
    type: String,
  },
  dinningRoomComments: {
    type: String,
  },
  hallTheme: {
    type: String,
  },
  hallComments: {
    type: String,
  },
  otherSpecialComments: {
    type: String,
  },
  projectName: {
    type: String,
    required: true,
  },
  projectLoc: {
    type: String,
  },
  dinningRoomComments: {
    type: String,
  },
  status: {
    type: Number,
    default: 0,
  },
});
module.exports = Request = mongoose.model('request', request);
