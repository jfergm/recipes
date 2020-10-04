import { gql } from 'apollo-server-express'


const typeDefs = gql`
  type Query {
    helloWorld: String
  }
`

export = [typeDefs]