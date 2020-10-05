import { User } from '../entity/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export = {
  Mutation: {
    signUp: async (_: any, { input }: any) : Promise<User[]> => {
      try {

        const user : User | undefined = await User.findOne({email: input.email})

        if(user) {
          throw new Error('Email already taken')
        }

        const hashPassword : String = await bcrypt.hash(input.password, 12);

        input.password = hashPassword;

        const newUser = User.create(input)

        await User.insert(newUser)

        return newUser
      } catch(e) {
        return e
      }

    },
    login: async(_: any, { input }: any): Promise<Object> => {
      try {
        const user : User | undefined = await User.findOne({email: input.email});


        if(!user) {
          throw new Error("User does not exists");
        }

        const isPasswordMatch : boolean = await bcrypt.compare(input.password, user.password);

        if(!isPasswordMatch) {
          throw new Error("Incorrect password");
        }

        const secret : string = process.env.JWT_SECRET || "DefaultSecret123";
        const token : string = jwt.sign({ email: user.email, id: user.id }, secret, { expiresIn: '1d' });

        return { token };
      } catch(error) {
        throw error;
      }
    }
  }
};