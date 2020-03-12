const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    getParticipantById(id:ID!): Participant,
    getParticipants: [Participant],
    getMeetingById(id:ID!): Meeting,
    getMeetings: [Meeting],
  }
`

module.exports = {
  query,
};