const mongoose = require('mongoose');
const Meeting = require('./meeting');
const Participant = require('./participant');
const CandidateLocation = require('./candidate-location.js');
const CandidateVoting = require('./candidate-voting.js')
const Result = require('./result');

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
