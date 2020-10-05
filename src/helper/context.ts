import jwt from 'jsonwebtoken';

interface userDataInteface {
  email: string;
  id: Number;
};

export const verifyToken = async (req : any) => {
  try {
    const bearer : string = req.headers.authorization
    req.userData = null
    if(bearer) {
      const token : string = bearer.split(' ')[1];
      const secret : string = process.env.JWT_SECRET || 'DefaultSecret123';
      const userData =  jwt.verify(token, secret);
      
      return userData;
    } 
  } catch(error) {
    throw error
  }
 
} 