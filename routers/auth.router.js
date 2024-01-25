import { Router } from "express";
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

export default router;