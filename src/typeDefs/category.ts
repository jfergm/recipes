import { gql } from 'apollo-server-express';

export = gql`
  extend type Query {
    getCategories: [Category!]
    getOneCategory(id:ID!): Category
  }

  extend type Mutation {
    createCategory(input: categoryInput!): Category
    updateCategory(id: ID!, input: categoryInput!): Category
  }

  type Category {
    id: ID!
    name: String!
  }

  input categoryInput {
    name: String!
  }
`;