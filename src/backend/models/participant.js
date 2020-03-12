const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  meetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'meeting',
  },
  participantName: {
    type: String,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  locationName: {
    type: String,
  },
  transportation: {
    type: String,
    default: "public"
  },
});

module.exports = mongoose.model('participant', participantSchema);