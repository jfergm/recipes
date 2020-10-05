import  category  from './category';
import user from './user';

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello World"
    }
  }
};

export = [resolvers, category, user];