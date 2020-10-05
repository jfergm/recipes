import { Recipe } from '../entity/Recipe';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './middleware';

export = {
  Query: {
    getRecipes: combineResolvers(isAuthenticated, async () : Promise<Recipe[]> => {
      try {
        const recipes : Recipe[] = await Recipe.find();

        return recipes;
      } catch(error) {
        return error
      }
    }),
    getOneRecipe: combineResolvers(isAuthenticated, async (_ :any, { id } : any) => {
      try {
        const recipe : Recipe | undefined = await Recipe.findOne(id);

        return recipe;
      } catch(error) {
        return error;
      }
    }),
    getMyRecipes: combineResolvers(isAuthenticated, async(_ : any, __ : any, { userData } : any) => {
      try {
        const myRecipes : Recipe[] = await Recipe.find({ user: userData.id });
        return myRecipes;
      } catch(error) {
        return error;
      }
    })
  },
  Mutation: {
    createRecipe: combineResolvers(isAuthenticated, async(_ : any, { input } : any, { userData } : any) => {
      try {
        input.user = userData.id;

        console.log(input,"xd")
        const newRecipe = Recipe.create(input);

        await Recipe.insert(newRecipe);

        return newRecipe;
      } catch(error) {
        return error;
      }
    })
  }
}