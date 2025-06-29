import passport from "passport";
import { registerLocal, loginLocal } from "./local.strategy.js"
import userModel from "../../models/user.model.js";
import { jwtLocal } from "./jwt.strategy.js";

const initializedPassport = () => {
    //Estrategias
    passport.use("login", loginLocal)
    passport.use("register", registerLocal)
    passport.use("jwt", jwtLocal)

    // Serealizacion
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        const user = await userModel.findById(id);
        delete user.password;
        done(null, user);
    });
}


export default initializedPassport;