const { gql } = require('apollo-server-express');

const resultType = gql`
  type Result {
    _id: ID!,
    candidates: [JSONObject],
    meeting: Meeting!
  }
`;

module.exports = {
  resultType,
};
