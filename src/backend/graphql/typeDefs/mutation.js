const { gql } = require('apollo-server-express');

const mutation = gql`
  type Mutation {
    createMeetingUser(userName: String!, userLocation:String!, token: String!): MeetingUser,
    deleteMeetingUser(id: ID!): MeetingUser,
    createMeeting(meetingName: String!, numberOfPeople: Int!): Meeting,
    deleteMeeting(id: ID!): Meeting,
  }
`

module.exports = {
  mutation,
}
