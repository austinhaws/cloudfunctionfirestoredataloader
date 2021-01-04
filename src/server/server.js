const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const { schema } = require('./schema');
const { resolvers } = require('./resolvers');

const apolloServer = new ApolloServer({
  introspection: true,
  playground: true,
  resolvers,
  typeDefs: schema,
});

const expressServer = express();
apolloServer.applyMiddleware({ app: expressServer, path: '/', cors: true });

exports.apolloServer = apolloServer;
exports.expressServer = expressServer;
