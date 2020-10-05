import { skip } from 'graphql-resolvers';

export const isAuthenticated = (_ : any, __ : any, { userData } : any) => {
  if(!userData) {
    throw new Error('Access denied')
  }

  return skip
}
