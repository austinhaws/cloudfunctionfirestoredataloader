const { gql } = require('apollo-server-express');

exports.schema = gql`

type SpeechTransition {
    from: String
    to: String
}

type Speech {
  name: String
  table: [SpeechTransition]
}

type Query {
  speeches: [Speech]
}

type Mutation {
  loadSpeeches: [String]
}
`;
