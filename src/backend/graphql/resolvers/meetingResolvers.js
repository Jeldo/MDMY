const { ApolloError } = require('apollo-server-express');
const { Meeting, Participant } = require('../../models');
const crypto = require('crypto');

const meetingResolvers = {
  // for relationship
  Meeting: {
    participants: async (meeting, { }) => {
      return await Participant.find({ meetingId: meeting._id });
    },
  },
  Query: {
    getMeetings: async () => await Meeting.find({}),
    getMeetingById: async (_, { id }) => await Meeting.findById(id),
  },
  Mutation: {
    createMeeting: async (_, args) => {
      try {
        let token = crypto.randomBytes(100).toString('hex');
        let newMeeting = new Meeting({
          meetingName: args.meetingName,
          numberOfParticipants: args.numberOfParticipants,
          token: token,
          participants: [],
        });
        return await newMeeting.save();
      } catch (e) {
        return e.message;
      }
    },
    // args.id == { id }
    deleteMeeting: async (_, { id }) => {
      let deletedMeeting = await Meeting.findOneAndDelete({ _id: id });
      if (deletedMeeting) {
        await Participant.deleteMany({ meetingId: id });
        return deletedMeeting
      } else {
        throw new ApolloError('Invalid Meeting ID', 404);
      }
    }
  },
};

module.exports = {
  meetingResolvers,
};