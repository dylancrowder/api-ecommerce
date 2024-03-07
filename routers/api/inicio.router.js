import { Router } from "express";

import ProfileController from "../../controllers/inicio.controller.js";
import UserController from "../../controllers/user.controller.js";
import { generateProducts } from "../../utils.js";
import authMiddleware from "../../config/auth.validation.jwt.js";
import userDaoMongoDB from "../../dao/user.dao.js";

const router = Router();
router.get("/chat", async (req, res) => {
  res.status(200).render("chat", { title: "chat" });
});

router.get("/profile", authMiddleware(["admin", "premium", "user"]), async (req, res) => {
  try {
    const { limit = 10, page = 1, sort = "asc", search = "" } = req.query;

    const { name, role, user_id } =
      await ProfileController.getUserInformation(req);

    const products = await ProfileController.get(limit, page, sort, search);

    const renderData = {
      ...products,
      user: user_id,
      title: "Lista de productos"
    };

    if (role !== "premium" && role !== "admin") {
      renderData.name = name;

    } else {
      renderData.premium = role
      renderData.admin = role
      renderData.name = name;
    }

    res.render("products", renderData)
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/current", authMiddleware(["admin", "premium", "user"]), async (req, res) => {

  try {
    const user = req.session;
    const userDTO = await UserController.findById(user.passport.user);
    res.status(200).json(userDTO);
  } catch (error) {
    console.log("fallo");
  }

});



router.put("/users/premium/:uid", async (req, res) => {

  try {

    console.log("este es el token", token);
    const { uid } = req.params
    console.log("este es ", uid);
    const { newRole } = req.body
    const user = await userDaoMongoDB.findById(uid)

    console.log("este es el usuario de la base de dat", user);
    console.log("este el el role", newRole);
    const userUpdate = await userDaoMongoDB.updateRole(uid, newRole)
    res.status(200).json(userUpdate)

  } catch (error) {
    res.status(400).json({ error: "no se encontro user" })
  }
})



router.get("/mockingproducts", authMiddleware(["admin", "premium"]), async (req, res) => {

  const user = await generateProducts()

  res.status(200).json(user)

})



export default router;
