import { Router } from "express";
import { faker } from "@faker-js/faker";
const router = Router();


router.get("/login", (req, res) => {
  res.render("login", { title: "hola" });
});



router.get("/register", (req, res) => {
  res.render("register", { title: "hola" });
});

router.get("/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Session destroy error:", error);
      res.status(500).json({ message: "ocurrió un error" });
    } else {
      res.render("login", { title: "ingresa" });
    }
  });
});


router.get('/faker', (req, res) => {
  res.status(200).json({
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    age: 18,
    email: faker.internet.email(),
    password: 123,
  });
});




export default router;