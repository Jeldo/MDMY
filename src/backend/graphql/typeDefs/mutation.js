const { gql } = require('apollo-server-express');

const mutation = gql`
  type Mutation {
    createParticipant(
      participantName: String!,
      location: InputCoordinates!,
      locationName: String!,
      transportation: String!,
      token: String!
    ): Participant,
    deleteParticipant(id: ID!): Participant,
    createMeeting(meetingName: String!, numberOfParticipants: Int!): Meeting!,
    deleteMeeting(id: ID!): Meeting,
    getMeetingResult(token: String!, searchPoint: [Float!]!): Meeting,
    castVote(token: String!, locationName: String!): Meeting,
  }

  input InputCoordinates {
    coordinates: [Float!]!
  }
`

module.exports = {
  mutation,
};
