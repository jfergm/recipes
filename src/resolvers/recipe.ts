import { Recipe } from '../entity/Recipe';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './middleware';
import { Category } from '../entity/Category';
import { Like } from 'typeorm'

export = {
  Query: {
    getRecipes: combineResolvers(isAuthenticated, async (_ : any, { category, ingredient, name}, __, info) : Promise<Recipe[]> => {
      try {

        console.log(info)
        const filterOpts : any = {};

        if(category) {
          filterOpts.category = category;
        }

        if(name) {
          filterOpts.name = name;
        }

        if(ingredient) {
          filterOpts.ingredients = Like(`%${ingredient}%`)
        }

        return await Recipe.find({relations: ['category'], ...filterOpts});

      } catch(error) {
        return error
      }
    }),
    getOneRecipe: combineResolvers(isAuthenticated, async (_ :any, { id } : any) => {
      try {
        const recipe : Recipe | undefined = await Recipe.findOne(id, { relations: ['category']});

        return recipe;
      } catch(error) {
        return error;
      }
    }),
    getMyRecipes: combineResolvers(isAuthenticated, async(_ : any, __ : any, { userData } : any) => {
      try {
        const myRecipes : Recipe[] = await Recipe.find({  relations: ['category'], where: { user: userData.id} });
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

        const newRecipe = Recipe.create(input);

        await Recipe.insert(newRecipe);

        return newRecipe;
      } catch(error) {
        return error;
      }
    }),
    updateRecipe: combineResolvers(isAuthenticated, async (_ : any, { id, input } : any) : Promise<Recipe | undefined> => {
      try {
        const recipe : Recipe | undefined = await Recipe.findOne({ id });
        if(!recipe) {
          throw new Error("Category does not exists")
        }

        return await Recipe.save({ ...recipe,  ...input});

      } catch(error) {
        return error
      }
    }),
    deleteRecipe: combineResolvers(isAuthenticated, async(_, { id }) => {
      try {
        const recipe : Recipe | undefined = await Recipe.findOne({id});
        const recipeDeleted : {} = { ... recipe};

        if(!recipe) {
          throw new Error("Recipe does not exists")
        }
        await recipe?.remove();

        return recipeDeleted;
      } catch(error) {
        return error;
      }
    })
  }
}