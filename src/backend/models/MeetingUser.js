const mongoose = require('mongoose')

const meetingUserSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "?"
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
  meetingID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Meetings',
    required: true
  }
});

module.exports = mongoose.model('MeetingUser', meetingUserSchema)
