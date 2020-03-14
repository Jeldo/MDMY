const { gql } = require('apollo-server-express');

const resultType = gql`
  type Result {
    _id: ID!,
    area: [Area!],
    meeting: Meeting!
  }

  type Area {
    # TODO(Taeyoung): define specific subfields and return JSONArrayObject
    areaName: String!,
  }
`;

module.exports = {
  resultType,
};
