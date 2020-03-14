const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
  meetingName: { type: String, required: true },
  numberOfParticipants: { type: Number, required: true },
  token: { type: String, required: true },
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'participant',
  }],
  result: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'result',
  },
  // result: { type: Boolean, default: false },
});

// meetingSchema.pre('remove', (next) => {
//   this.model('participant').deleteMany({ meetingId: this._id }, next);
// });

module.exports = mongoose.model('meeting', meetingSchema);