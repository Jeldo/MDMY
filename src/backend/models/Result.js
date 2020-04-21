const mongoose = require('mongoose')

const resultSchema = new mongoose.Schema({
  meetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meeting',
    required: true,
    unique: true
  },
  candidates: {
    type: Array,
  },
});

module.exports = mongoose.model('result', resultSchema);
