import { gql } from 'apollo-server-express';

export = gql`
  extend type Query {
    getCategories: [Category!]
    getOneCategory(id:ID!): Category
  }

  extend type Mutation {
    createCategory(input: createCategoryInput!): Category
  }

  type Category {
    id: ID!
    name: String!
  }

  input createCategoryInput {
    name: String!
  }
`;