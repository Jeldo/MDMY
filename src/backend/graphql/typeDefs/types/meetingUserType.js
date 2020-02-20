const { gql } = require('apollo-server-express');

const meetingUserType = gql`
  type MeetingUser {
    id: ID!
    meetingUserName: String
    location:  #def coords
    locationName: String
    transportation: String
    meetingId: #def id
  }
`;

module.exports = {
  meetingUserType,
};
