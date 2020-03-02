const { Meeting } = require('../../models');
const crypto = require('crypto');

const meetingResolvers = {
  Query: {
    getMeetings: async () => await Meeting.find({}),
    getMeetingById: async (_, { id }) => await Meeting.findById(id),
  },
  Mutation: {
    createMeeting: async (_, args) => {
      try {
        let token = crypto.randomBytes(100).toString('hex');
        let meeting = new Meeting({
          meetingName: args.meetingName,
          numberOfPeople: args.numberOfPeople,
          token: token,
        });
        return await meeting.save();
      } catch (e) {
        return e.message;
      }
    },
    // args.id == { id }
    deleteMeeting: async (_, { id }) => {
      try {
        let deletedMeeting = await Meeting.findOneAndDelete({ _id: id });
        return deletedMeeting;
      } catch (e) {
        return e.message;
      }
    }
  },
};

module.exports = {
  meetingResolvers,
};