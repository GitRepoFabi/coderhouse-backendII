import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

const PRIVATE_KEY= process.env.PRIVATE_KEY || "secret_key";

export const createHast = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

export const isValidPassword = (user, password) => {
    return bcrypt.compareSync(password, user.password);
};

export const generateToken = (user) => {
    const token = jwt.sign({user},PRIVATE_KEY,{expiresIn:'1h'})
    return token;
}

export const verifySign = (token) => {
  try {
    const credentials = jwt.verify(token, PRIVATE_KEY);
    return credentials
  } catch (error) {
    console.error("Invalid signature")
    return null  
  }
}