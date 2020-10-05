import  category  from './category';
import user from './user';
import recipe from './recipe'

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello World";
    }
  }
};

export = [category, user, recipe];