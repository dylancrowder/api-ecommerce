import { Router } from "express";
import { faker } from "@faker-js/faker";
import UserService from "../services/user.service.js";
const router = Router();


router.get("/login", (req, res) => {
  res.render("login", { title: "hola" });
});



router.get("/register", (req, res) => {
  res.render("register", { title: "hola" });
});

router.get("/logout", async (req, res) => {
  try {

    const userID = req.user._id.toJSON()
    // Verifica si el usuario está autenticado
    if (!req.session) {

      return res.status(401).json({ message: "Debes iniciar sesión para acceder a esta página" });
    }

    // Busca al usuario en la base de datos
    const user = await UserService.findById(userID);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    user.last_conection = new Date();
    await user.save();

    // Destruye la sesión
    req.session.destroy((error) => {
      if (error) {
        console.error("Session destroy error:", error);
        return res.status(500).json({ message: "Ocurrió un error al cerrar sesión" });
      }

      // Redirige al usuario a la página de inicio de sesión
      res.render("login", { title: "Ingresar" });
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Ocurrió un error al cerrar sesión" });
  }
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