import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
    
    if (req.user) {
      res.redirect("/profile")
    }

    res.render("login",{title:'Login'});
});

router.get("/login", (req, res) => {
  res.render("login"),{title:'Login'};
});

router.get("/register", (req, res) => {
    res.render("register",{title:'Register'});
});

router.get("/profile", (req, res) => {
    const { first_name, last_name, age, role} = req.user
    res.render("profile", {first_name, last_name, age, role,title:'Profile'});
});

router.get("/failed", (req, res) => {
    res.render("failed",{title:'Error'});
})

export default router;