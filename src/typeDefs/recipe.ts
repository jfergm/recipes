import { gql } from 'apollo-server-express'

export = gql`
  extend type Query {
    getRecipes: [Recipe!]
    getOneRecipe(id: ID!): Recipe
    getMyRecipes: [Recipe!]
  }

  extend type Mutation {
    createRecipe(input: inputCreateRecipe): Recipe
  }

  type Recipe {
    id: ID!
    name: String!
    description: String
    ingredients: [String!]
    category: Int!
  }

  input inputCreateRecipe {
    name: String!
    description: String
    ingredients: [String!]
    category: Int!
  }
`;