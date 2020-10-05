import { gql } from 'apollo-server-express'

export = gql`
  extend type Query {
    getRecipes(category: Int, name: String, ingredient: String): [Recipe!]
    getOneRecipe(id: ID!): Recipe
    getMyRecipes: [Recipe!]
  }

  extend type Mutation {
    createRecipe(input: inputCreateRecipe): Recipe
    updateRecipe(id: ID!, input: inputUpdateRecipe): Recipe
    deleteRecipe(id: ID!): Recipe
  }

  type Recipe {
    id: ID!
    name: String!
    description: String
    ingredients: [String!]
    category: Category
  }

  input inputCreateRecipe {
    name: String!
    description: String
    ingredients: [String!]
    category: Int!
  }

  input inputUpdateRecipe {
    name: String
    description: String
    ingredients: [String!]
    category: Int
  }
`;