const mongoose = require('mongoose');
const Meeting = require('./Meeting.js');
const MeetingUser = require('./MeetingUser.js');
const CandidateLocation = require('./CandidateLocation.js');
const CandidateVoting = require('./CandidateVoting.js')
const Result = require('./Result.js');

const connectDB = () => {
  console.log("connect with MDMY DB")
  return mongoose.connect('mongodb://localhost/db', { useNewUrlParser: true });
};

module.exports = { connectDB, Meeting, CandidateLocation, MeetingUser, Result, CandidateVoting };
