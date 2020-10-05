import { gql } from 'apollo-server-express';

import category from './category';
import user from './user';
import recipe from './recipe';

const typeDefs = gql`
  type Query {
    helloWorld: String
  }

  type Mutation {
    _: String
  }
`;

export = [typeDefs, category, user, recipe];