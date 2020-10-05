import { Recipe } from '../entity/Recipe';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './middleware';
import { Category } from '../entity/Category';
import { Like } from 'typeorm'

export = {
  Query: {
    getRecipes: combineResolvers(isAuthenticated, async (_ , { category, ingredient, name}) : Promise<Recipe[]> => {
      try {
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

        const recipes : Recipe[] = await Recipe.find(filterOpts);

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
    })
  },
  Recipe: {
    category: async(parent : any) : Promise<Category | undefined> => {
      try {
        const category : Category | undefined = await Category.findOne({id: parent.category});
        return category;
      } catch(error) {
        return error;
      }
    }
  }
}