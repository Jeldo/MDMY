const { gql } = require('apollo-server-express');

const meetingUserType = gql`
  type MeetingUser {
    id: ID!,
    userName: String!,
    location: Coordinates!,
    locationName: String!,
    transportation: String!,
    meetingId: String!,
  }

  type Coordinates {
    coordinates: [Float!]!,
  }
`;

module.exports = {
  meetingUserType,
};
