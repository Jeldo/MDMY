const { gql } = require('apollo-server-express');

const mutation = gql`
  type Mutation {
    createParticipant(
      participantName: String!,
      location: InputCoordinates!,
      locationName:String!,
      transportation: String!,
      token: String!
    ): Participant,
    deleteParticipant(id: ID!): Participant,
    createMeeting(meetingName: String!, numberOfParticipants: Int!): Meeting!,
    deleteMeeting(id: ID!): Meeting,
  }

  input InputCoordinates {
    coordinates: [Float!]!
  }
`

module.exports = {
  mutation,
}
