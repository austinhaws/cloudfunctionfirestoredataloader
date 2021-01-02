const {gql} = require('apollo-server-express');

const schema = gql`
  scalar Date

  type Query {
    version: String
  }

  type Mutation {
    deleteBracket(bracketId: ID!) : ID
  }
`;

export default schema;
