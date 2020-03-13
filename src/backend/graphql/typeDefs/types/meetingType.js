const { gql } = require('apollo-server-express');

const meetingType = gql`
  type Meeting {
    _id: ID!,
    meetingName: String,
    numberOfParticipants: Int!,
    token: String!,
    participants: [Participant]!,
    result: Boolean!,
  }
`;

module.exports = {
  meetingType,
};
