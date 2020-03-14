const { Meeting } = require('../../models');
const { ApolloError } = require('apollo-server-express');

const resultResolvers = {
  // for relationship
  Result: {
    meeting: async (result, args) => {
      return await Meeting.findById(result.meetingId);
    },
  },
};

module.exports = {
  resultResolvers,
};