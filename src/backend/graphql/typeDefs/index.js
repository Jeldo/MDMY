const { query } = require('./query');
const { mutation } = require('./mutation');
const { participantType, meetingType, resultType } = require('./types');

const typeDefs = [query, mutation, participantType, meetingType, resultType];

module.exports = {
  typeDefs,
};
