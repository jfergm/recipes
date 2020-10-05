import { Category } from '../entity/Category';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './middleware';

export = {
  Query: {
    getCategories: combineResolvers(isAuthenticated, async (): Promise<Category[]> => {
      try {
        const categories : Category[] = await Category.find();
        return categories;
      } catch(e) {
        return e;
      }
    }),
    getOneCategory: combineResolvers(isAuthenticated, async (_ : Object, { id } : any): Promise<Category | undefined> => {
      try {
        const category : Category | undefined = await Category.findOne({id});
        return category;
      } catch(error) {
        return error;
      }
    })
  },
  Mutation: {
    createCategory: combineResolvers(isAuthenticated, async (_ : any, { input } : any): Promise<Category[]> => {
      try {
        const newCategory = Category.create(input);
        await Category.insert(newCategory);
        console.log(newCategory);
        return newCategory;
      } catch(error) {
        console.log(error);
        return error;
      }
    }),
    updateCategory: combineResolvers(isAuthenticated, async (_ : any, { id, input } : any) : Promise<Category | undefined> => {
      try {
        const category : Category | undefined = await Category.findOne({ id });
        if(!category) {
          throw new Error("Category does not exists")
        }

        return await Category.save({ ...category,  ...input});

        return category;
      } catch(error) {
        return error
      }
    })
  }
};