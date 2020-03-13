const { Participant, Meeting } = require('../../models');
const { UserInputError, ApolloError } = require('apollo-server-express');

const participantResolvers = {
  // for relationship
  Participant: {
    meeting: async (participant, args) => {
      return await Meeting.findById(participant.meetingId);
    },
  },
  Query: {
    getParticipants: async () => await Participant.find({}),
    getParticipantById: async (_, { _id }) => await Participant.findById(_id),
  },
  Mutation: {
    createParticipant: async (_, args) => {
      let targetMeeting;
      targetMeeting = await Meeting.findOne({
        token: args.token
      });
      if (targetMeeting == null) {
        throw new UserInputError('Invalid Token');
      }
      if (targetMeeting.numberOfParticipants == targetMeeting.participants.length) {
        throw new ApolloError('Cannot add more user');
      }
      let newParticipant;
      try {
        newParticipant = new Participant({
          meetingId: targetMeeting._id,
          participantName: args.participantName,
          location: {
            type: "Point",
            coordinates: args.location.coordinates
          },
          locationName: args.locationName,
        });
        targetMeeting.participants.push(newParticipant._id);
        await Meeting.findOneAndUpdate(
          { _id: targetMeeting._id },
          targetMeeting,
          { new: true }
        );
        return await newParticipant.save();
      } catch (e) {
        return e.message;
      }
    },
    // args.id == { id }
    deleteParticipant: async (_, { id }) => {
      try {
        return await Participant.findOneAndDelete({ _id: id });
      } catch (e) {
        return e.message;
      }
    },
  },
};

module.exports = {
  participantResolvers,
};