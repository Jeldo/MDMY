const mongoose = require('mongoose')

const meetingUserSchema = new mongoose.Schema({
  userName: {
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
  meetingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meeting',
    required: true
  }
});

module.exports = mongoose.model('MeetingUser', meetingUserSchema);
