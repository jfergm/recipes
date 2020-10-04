import { gql } from 'apollo-server-express';

import category from './category';

const typeDefs = gql`
  type Query {
    helloWorld: String
  }

  type Mutation {
    _: String
  }
`;

export = [typeDefs, category];