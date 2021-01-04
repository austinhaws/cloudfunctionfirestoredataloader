require('dotenv').config();
const { ApolloServer, gql } = require('apollo-server');

const server = async () => {
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
            books: () => books,
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

    // The `listen` method launches a web server.
    console.log(process.env.dev);
    if (process && process.env && process.env.DEV) {
        apolloServer.listen().then(({ url }) => {
            console.log(`🚀  Server ready at ${url}`);
        });
    }

    return apolloServer;
};


const { https } = require('firebase-functions');
const api = https.onRequest(server());
exports.api = api;
