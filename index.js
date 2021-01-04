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

    const apolloServer = new ApolloServer({
        debug: true,
        introspection: true,
        playground: true,
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


const {https} = require('firebase-functions');
const api = https.onRequest(server());
exports.api = api;
