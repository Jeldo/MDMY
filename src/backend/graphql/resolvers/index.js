const { participantResolvers } = require('./participant-resolvers');
const { meetingResolvers } = require('./meeting-resolvers');
const { resultResolvers } = require('./result-resolvers');
const { JSONObjectResolver } = require('graphql-scalars');

const resolvers = [
  participantResolvers,
  meetingResolvers,
  resultResolvers,
  { JSONObject: JSONObjectResolver },
];

module.exports = {
  resolvers,
};