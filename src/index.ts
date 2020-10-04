import express from 'express';
import { ApolloServer} from 'apollo-server-express';

import resolvers from './resolvers/'
import typeDefs from './typeDefs'

const app = express();
const PORT = process.env.PORT || 3000;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
});

apolloServer.applyMiddleware({app, path: '/graphql'});

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});