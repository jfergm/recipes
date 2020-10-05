import { gql } from 'apollo-server-express'

export = gql`
  extend type Mutation {
    signUp(input: signUpInput): User
    login(input: loginInput): Token
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
  }

  type Token {
    token: String!
  }

  input signUpInput {
    name: String!
    email: String!
    password: String!
  }

  input loginInput {
    email: String!
    password: String!
  }
`;