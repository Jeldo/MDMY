const { gql } = require('apollo-server-express');

const participantType = gql`
  type Participant {
    _id: ID!,
    participantName: String!,
    location: Coordinates!,
    locationName: String!,
    transportation: String!,
    meeting: Meeting!
  }

  type Coordinates {
    coordinates: [Float!]!,
  }
`;

module.exports = {
  participantType,
};
