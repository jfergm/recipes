import express from 'express';
import { ApolloServer} from 'apollo-server-express';
import dotEnv from 'dotenv';

import resolvers from './resolvers/';
import typeDefs from './typeDefs';

import { connect } from './config/typeorm';
dotEnv.config()

const app = express();
const PORT = process.env.PORT || 3000;

dotEnv.config();
connect();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true
});

apolloServer.applyMiddleware({app, path: '/graphql'});

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});