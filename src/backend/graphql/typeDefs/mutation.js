const { gql } = require('apollo-server-express');

const mutation = gql`
  type Mutation {
    createMeetingUser(userName: String!, location: InputCoordinates!, locationName:String!, transportation: String!, token: String!): MeetingUser,
    deleteMeetingUser(id: ID!): MeetingUser,
    createMeeting(meetingName: String!, numberOfPeople: Int!): Meeting,
    deleteMeeting(id: ID!): Meeting,
  }

  input InputCoordinates {
    coordinates: [Float!]!
  }
`

module.exports = {
  mutation,
}
