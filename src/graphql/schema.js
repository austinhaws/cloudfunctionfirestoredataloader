const {gql} = require('apollo-server-express');

const schema = gql`
  scalar Date

  type Query {
    version: String
  }
`;

export default schema;
