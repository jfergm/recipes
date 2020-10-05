import express from 'express';
import { ApolloServer} from 'apollo-server-express';
import dotEnv from 'dotenv';

import resolvers from './resolvers/';
import typeDefs from './typeDefs';

import { connect } from './config/typeorm';
import { verifyToken } from './helper/context';

dotEnv.config()

const app = express();
const PORT = process.env.PORT || 3000;

dotEnv.config();
connect();

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({ req }) => {
    let contextObject : any = {};
    if (req) {
      const userData = await verifyToken(req)
      
      contextObject.userData = userData;
    }

    return contextObject;
  },
  playground: true,
  introspection: true,
  formatError: (error) => {
    return {
      message: error.message
    }
  }
});

apolloServer.applyMiddleware({app, path: '/graphql'});

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});