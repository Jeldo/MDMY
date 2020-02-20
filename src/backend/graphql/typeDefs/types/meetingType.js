const { gql } = require('apollo-server-express');
const { meetingUserType } = require('./meetingUserType');

const meetingType = gql`
  type Meeting {
    id: ID!
    meetingName: String!
    meetingNumberOfPeople: Int
    token: String
    meetingUsers: meetingUserType
    result: Boolean
  }
`;

module.exports = {
  meetingType,
};
