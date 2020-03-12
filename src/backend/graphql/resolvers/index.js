const { participantResolvers } = require('./participantResolvers');
const { meetingResolvers } = require('./meetingResolvers');

const resolvers = [participantResolvers, meetingResolvers,];

module.exports = {
  resolvers,
};