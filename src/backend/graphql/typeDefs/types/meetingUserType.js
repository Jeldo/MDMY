const { gql } = require('apollo-server-express');

const meetingUserType = gql`
  type MeetingUser {
    id: ID!,
    meetingUserName: String,
    # location:  #def coords
    locationName: String,
    transportation: String,
    meetingId: String!,
  }
`;

module.exports = {
  meetingUserType,
};
