import { Category } from '../entity/Category';
import { combineResolvers } from 'graphql-resolvers';
import { isAuthenticated } from './middleware';
import { Like } from 'typeorm';

export = {
  Query: {
    getCategories: combineResolvers(isAuthenticated, async (_ : any, { filter }): Promise<Category[]> => {
      try {
        const filterOpts : any = {};
        if(filter) {
          filterOpts.name = Like(`%${filter}%`);
        }
        const categories : Category[] = await Category.find(filterOpts);
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
        return newCategory;
      } catch(error) {
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

      } catch(error) {
        return error
      }
    }),
    deleteCategory: combineResolvers(isAuthenticated, async(_, { id }) => {
      try {
        const category : Category | undefined = await Category.findOne({ id });
        const categoryDeleted : {} = { ...category }

        if(!category) {
          throw new Error("Category does not exists");
        }
        await category?.remove();

        return categoryDeleted;
      } catch(error) {
        return error;
      }
    })
  }
};