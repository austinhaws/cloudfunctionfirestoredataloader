const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');

require('dotenv').config();

const typeDefs = gql`
  type Book {
    title: String
    author: String
  }

  type Query {
    books: [Book]
  }
`;
const books = [
    {
        title: 'The Awakening',
        author: 'Kate Chopin',
    },
    {
        title: 'City of Glass',
        author: 'Paul Auster',
    },
];

const resolvers = {
    Query: {
        books: () => console.log(books) || books,
    },
};

const expressServer = express();

const apolloServer = new ApolloServer({
    introspection: true,
    playground: true,
    resolvers,
    typeDefs,
});

apolloServer.applyMiddleware({ app: expressServer, path: '/', cors: true });

// if running locally in dev, then keep server running
if (process.env.DEV) {
    const port = 9031;
    expressServer.listen(port);
    console.log(`http://localhost:${port}`);
}

const { https } = require('firebase-functions');
const api = https.onRequest(expressServer);
exports.api = api;
