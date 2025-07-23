import { Strategy } from "passport-local";
import userModel from "../../models/user.model.js";
import { createHash, isValidPassword, generateToken, registerMail } from "../../utils.js";

async function verifyRegister(req, username, password, done) {
  
  //Lógica de registro de usuario

  const { first_name, last_name, age, cart } = req.body;

  try {
    const userFound = await userModel.findOne({ email: username });
    if (userFound) return done(null, false, { message: "User already exists" });

    const newUser = {
      first_name,
      last_name,
      age,
      cart,
      password: createHash(password),
      email: username
    }

    const newDoc = await userModel.create(newUser);
    const envioMail = await registerMail(newUser.email);

    return done(null, newDoc)

  } catch (error) {
    console.error(error);
    return done("Internal server error (view console)");
  }

}

async function verifyLogin(username, password, done) {
  //Lógica de login de usuario
  try {
    const user = await userModel.findOne({ email: username });
    if (isValidPassword(user, password)) {
      delete user.password;
      return done(null,user)
    } else {
      return done(null, false, { message: "Invalid credentials" })
    }

  } catch (error) {
    console.error(error);
    return done("Internal server error (view console)");
  }
}

export const registerLocal = new Strategy({
  usernameField: "email", passReqToCallback: true
}, verifyRegister
)

export const loginLocal = new Strategy({
  usernameField: "email"
}, verifyLogin
)
