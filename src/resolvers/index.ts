import  category  from './category';

const resolvers = {
  Query: {
    helloWorld: () => {
      return "Hello World"
    }
  }
};

export = [resolvers, category];