const { MeetingUser, Meeting } = require('../../models');

const meetingUserResolvers = {
  Query: {
    // getMeetingUsers: async () => await MeetingUser.find({}),
    // getMeetingUserById: async (_, { id }) => await MeetingUser.findById(id),
  },
  Mutation: {
    createMeetingUser: async (_, args) => {
      let meeting;
      try {
        meeting = await Meeting.findOne({
          token: args.token
        });
        if (meeting == null) {
          // TODO(Taeyoung): do null check
          return
        }
      } catch (e) {
        return e.message;
      }
      let meetingUser;
      try {
        meetingUser = new MeetingUser({
          userName: args.userName,
          userLocation: args.userLocation,
          meetingId: meeting._id,
        });
        return await meetingUser.save();
      } catch (e) {
        console.log('meetinguser>>', meetingUser);
        return e.message;
      }
    },
    // args.id == { id }
    deleteMeetingUser: async (_, { id }) => {
      try {
        let deletedMeetingUser = await MeetingUser.findOneAndDelete({ _id: id });
        return deletedMeetingUser;
      } catch (e) {
        return e.message;
      }
    },
  },
};

module.exports = {
  meetingUserResolvers
};