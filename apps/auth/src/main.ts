const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3004;

import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { resolvers } from './resolvers/index.resolver';
import { typeDefs } from './schemas/index.schema';
import { connect } from './database/mongodb';
import { jwtValidationMiddleware } from './middlewares/jwt';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  context: async ({ req, res }) => ({
    user: jwtValidationMiddleware(req?.headers?.authorization as string),
  }),
  listen: { port },
}).then(({ url }) => {
  connect();
  console.log(`[ ready ] ${url}`);
});
