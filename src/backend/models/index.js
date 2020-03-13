const mongoose = require('mongoose');
const Meeting = require('./meeting');
const Participant = require('./participant');
const CandidateLocation = require('./CandidateLocation.js');
const CandidateVoting = require('./CandidateVoting.js')
const Result = require('./Result.js');

const connectDB = () => {
  console.log("connect with MDMY DB")
  return mongoose.connect('mongodb://localhost/MDMY', { useNewUrlParser: true });
};

module.exports = {
  connectDB,
  Meeting,
  CandidateLocation,
  Participant,
  Result,
  CandidateVoting
};
