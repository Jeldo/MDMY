const { meetingUserResolvers } = require('./meetingUserResolvers');
const { meetingResolvers } = require('./meetingResolvers');
// const { locationResolvers } = require('./locationResolvers');

// TODO(Taeyoung): add locationResolvers
const resolvers = [meetingUserResolvers, meetingResolvers,];

module.exports = {
  resolvers,
};