const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    getParticipantById(id: ID!): Participant,
    getParticipants: [Participant],
    getMeetingById(id: ID!): Meeting,
    getMeetingByToken(token: String!): Meeting,
    getMeetings: [Meeting],
  }
`

module.exports = {
  query,
};