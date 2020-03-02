const { query } = require('./query');
const { mutation } = require('./mutation');
const { meetingUserType, meetingType } = require('./types');

const typeDefs = [query, mutation, meetingUserType, meetingType];

module.exports = {
  typeDefs,
};
