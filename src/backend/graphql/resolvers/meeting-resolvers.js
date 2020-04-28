const { ApolloError } = require('apollo-server-express');
const { Meeting, Participant, Result } = require('../../models');
const { getResult } = require('../../lib/findRoute/result');
const crypto = require('crypto');

const meetingResolvers = {
  // for relationship
  Meeting: {
    participants: async (meeting, { }) => {
      return await Participant.find({ meetingId: meeting._id });
    },
    result: async (meeting, { }) => {
      return await Result.findOne({ meetingId: meeting._id });
    },
  },
  Query: {
    getMeetings: async () => await Meeting.find({}),
    getMeetingById: async (_, { id }) => await Meeting.findById(id),
    getMeetingByToken: async (_, { token }) => {
      return await Meeting.findOne({ token: token });
    },
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
        await Result.findOneAndDelete({ meetingId: id });
        return deletedMeeting;
      } else {
        throw new ApolloError('Invalid Meeting ID', 401);
      }
    },
    getMeetingResult: async (_, args) => {
      let meeting = await Meeting.findOne({ token: args.token });
      if (meeting == null) {
        throw new ApolloError('Invalid Token', 401);
      } else {
        let result = await Result.findOne({ meetingId: meeting._id });
        if (result == null) {
          // Create new result if no result found in the database.
          let participants = await Participant.find({ meetingId: meeting._id });
          let searchPoint = {
            'location': {
              'lng': args.searchPoint[0],
              'lat': args.searchPoint[1]
            }
          };
          result = await getResult(participants, searchPoint);
          if (result == null) {
            // TODO(Taeyoung): Handle null result due to exceeding maximum search time.
            console.log('No candidate found');
          } else {
            let newResult = new Result({
              meetingId: meeting._id,
              candidates: result.candidates,
            });
            await newResult.save();
            meeting.result = newResult._id;
            await Meeting.findOneAndUpdate(
              { _id: meeting._id },
              meeting,
              { new: true }
            );
          }
        }
      }
      return meeting;
    },
    castVote: async (_, args) => {
      let meeting = await Meeting.findOne({ token: args.token });
      if (!meeting) {
        throw new ApolloError('Invalid Token', 401);
      }
      let result = await Result.findOne({ meetingId: meeting._id });
      let targetCandidate = result.candidates.find(
        candidate => candidate.name == args.locationName
      );
      // TODO(Taeyoung): Block if the number exceeds the number of participants
      ++targetCandidate.numberOfVotes;
      await Result.findOneAndUpdate({ _id: result._id }, result, { new: true });
      return meeting;
    },
  }
};

module.exports = {
  meetingResolvers,
};