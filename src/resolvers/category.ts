import { Category } from '../entity/Category';

export = {
  Query: {
    getCategories: async (): Promise<Category[]> => {
      try {
        const categories = await Category.find()
        return categories
      } catch(e) {
        return e
      }
    },
    getOneCategory: async (_ : Object, { id } : any): Promise<Category | undefined> => {
      try {
        const category = await Category.findOne({id})
        return category
      } catch(e) {
      }
    }
  },
  Mutation: {
    createCategory: async (_ : any, { input } : any): Promise<Category[]> => {
      try {
        const newCategory = Category.create(input)
        await Category.insert(newCategory)
        console.log(newCategory)
        return newCategory
      } catch(e) {
        console.log(e)
        return e
      }
    }
  }
};