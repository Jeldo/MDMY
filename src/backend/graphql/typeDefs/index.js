const { query } = require('./query');
const { mutation } = require('./mutation');
const { participantType, meetingType, resultType } = require('./types');
const { JSONObjectDefinition } = require('graphql-scalars');

const typeDefs = [
  query,
  mutation,
  participantType,
  meetingType,
  resultType,
  JSONObjectDefinition,
];

module.exports = {
  typeDefs,
};
