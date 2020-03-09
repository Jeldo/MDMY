const { gql } = require('apollo-server-express');

const query = gql`
  type Query {
    getMeetingUsers: [MeetingUser],
    getMeetingById(id:ID!): Meeting,
    getMeetings: [Meeting],
  }
`

module.exports = {
  query,
};