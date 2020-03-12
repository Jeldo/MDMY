const { query } = require('./query');
const { mutation } = require('./mutation');
const { participantType, meetingType } = require('./types');

const typeDefs = [query, mutation, participantType, meetingType];

module.exports = {
  typeDefs,
};
