const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  meetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meeting',
    required: true,
  },
  participantName: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    }
  },
  locationName: {
    type: String,
    required: true,
  },
  transportation: {
    type: String,
    default: "public",
    required: true,
  },
});

module.exports = mongoose.model('participant', participantSchema);