import { Router } from "express";
import passport from "passport";
import userModel from '../models/user.model.js';
import { generateToken } from "../utils.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", {
    successRedirect: "/login",
    failureRedirect: "/failed",
  }),
);

router.post(
  "/login",
  passport.authenticate("login", {
    successRedirect: "/profile",
    failureRedirect: "/failed",
  }),
);

router.post("/logout", (req, res) => {
  req.session.user = null
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Unexpected Server Error" });
    }
    return res.redirect("/")
  })
});

router.post('/login-jwt', async (req, res) => {
  
  const { email } = req.body;
  const user = await userModel.findOne({ email: email })
  if (!user) return res.status(400).send({ status: "error", error: "Invalid credentials" })
  const access_token = generateToken({
    first_name:user.first_name, 
    last_name: user.last_name,
    email: user.email,
    age: user.age,
    cart: user.cart,
    role: user.role
   });

  res.cookie("access_token",access_token, {
    httpOnly:true
  });

  res.send({ status: "success", access_token });
})

router.get("/current", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.send({ status: "success", payload: req.user });
});

export default router;