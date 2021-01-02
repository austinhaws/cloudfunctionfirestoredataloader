import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import resolvers from './resolverFunctions';
import schema from './schema';

const {ErrorReporting} = require('@google-cloud/error-reporting');
const errors = new ErrorReporting();

export default async () => {
  const app = express();

  const apolloServer = new ApolloServer({
    typeDefs: schema,
    resolvers,
    // Enable graphiql gui
    introspection: true,
    playground: true,
    // tracing: process.env.DEV,
    context: async ({req}) => ({

      // recreate loaders for each request so that caching is on the request level and not on the server level
      // https://www.robinwieruch.de/graphql-apollo-server-tutorial#batching-and-caching-in-graphql-with-data-loader
      // loaders: loaders(),
      req,
    }),
    formatError: err => {
      console.log(JSON.stringify(err, null, 4));
      return err;
    },
  });

  apolloServer.applyMiddleware({app, path: '/', cors: true});

  // Note that express error handling middleware should be attached after all
  // the other routes and use() calls. See the Express.js docs.
  app.use(errors.express);

  // if running locally in dev, then keep server running
  if (process.env.DEV) {
    const port = 9031;
    app.listen(port);
console.log(`http://localhost:${port}`);
  }

  return app;
};
