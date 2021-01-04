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

const errorLogging = {
    requestDidStart(requestContext) {
        console.log('Request started!', requestContext);
        return {
            parsingDidStart(requestContext) {
                console.log("ApolloGQL: parsingDidStart A", requestContext);
                return (err) => {
                    if (err) {
                        console.error("ApolloGQL: parsingDidStart B", err);
                    }
                }
            },
            validationDidStart(requestContext) {
                console.log("ApolloGQL: validationDidStart A", requestContext);
                return (errs) => {
                    if (errs) {
                        errs.forEach(err => console.error("ApolloGQL: validationDidStart B", err));
                    }
                }
            },

            didResolveOperation(requestContext) {
                console.log("ApolloGQL: didResolveOperation", requestContext);
            },
            responseForOperation(requestContext) {
                console.log("ApolloGQL: responseForOperation", requestContext);
            },
            executionDidStart(requestContext) {
                console.log("ApolloGQL: executionDidStart A", requestContext);
                return (err) => {
                    if (err) {
                        console.error("ApolloGQL: executionDidStart B", err);
                    }
                }
            },
            didEncounterErrors(requestContext) {
                console.log("ApolloGQL: didEncounterErrors", requestContext);
            },
            willSendResponse(requestContext) {
                console.log("ApolloGQL: willSendResponse", requestContext);
            },
        }
    },
};

const expressServer = express();

const apolloServer = new ApolloServer({
    debug: true,
    introspection: true,
    playground: true,
    plugins: [
        errorLogging
    ],
    resolvers,
    tracing: true,
    typeDefs,
});

apolloServer.applyMiddleware({app: expressServer, path: '/', cors: true});

// if running locally in dev, then keep server running
if (process.env.DEV) {
  const port = 9031;
  expressServer.listen(port);
console.log(`http://localhost:${port}`);
}

const { https } = require('firebase-functions');
const api = https.onRequest(expressServer);
exports.api = api;
