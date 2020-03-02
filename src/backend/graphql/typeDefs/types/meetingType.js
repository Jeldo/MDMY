const { gql } = require('apollo-server-express');

const meetingType = gql`
  type Meeting {
    id: ID!,
    meetingName: String!,
    numberOfPeople: Int!,
    token: String,
    meetingUsers: [MeetingUser],
    result: Boolean,
  }
`;

module.exports = {
  meetingType,
};
