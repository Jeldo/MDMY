const mongoose = require('mongoose')

const meetingSchema = new mongoose.Schema({
  meetingName: { type: String, },
  numberOfPeople: { type: Number, },
  token: { type: String, },
  meetingUsers: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'MeetingUser',
  }],
  result: { type: Boolean, default: false }
})

meetingSchema.pre('remove', (next) => {
  this.model('MeetingUser').deleteMany({ meetingID: this._id }, next);
});

module.exports = mongoose.model('Meeting', meetingSchema)
