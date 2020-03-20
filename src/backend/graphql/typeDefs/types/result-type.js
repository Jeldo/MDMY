const { gql } = require('apollo-server-express');

const resultType = gql`
  type Result {
    _id: ID!,
    areas: [JSONObject],
    meeting: Meeting!
  }
`;

module.exports = {
  resultType,
};
