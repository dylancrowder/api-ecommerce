import { Router } from "express";

import ProfileController from "../../controllers/inicio.controller.js";
import UserController from "../../controllers/user.controller.js";
import { generateProducts } from "../../utils.js";

const router = Router();
router.get("/chat", async (req, res) => {
  res.status(200).render("chat", { title: "chat" });
});

router.get("/profile", async (req, res) => {
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

    if (role !== "admin") {
      renderData.name = name;

    } else {
      renderData.admin = role;
      renderData.name = name;
    }

    res.render("products", renderData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/current", async (req, res) => {

  try {
    const user = req.session;
    const userDTO = await UserController.findById(user.passport.user);
    res.status(200).json(userDTO);
  } catch (error) {
    console.log("fallo");
  }

});



router.get("/mockingproducts", async (req, res) => {

  const user = await generateProducts()

  res.status(200).json(user)

})










router.get('/testLogger', (req, res) => {
  req.logger.silly('Hola desde el request index home 😁 (silly)');
  req.logger.debug('Hola desde el request index home 😁 (debug)');
  req.logger.verbose('Hola desde el request index home 😁 (verbose)');
  req.logger.http('Hola desde el request index home 😁 (http)');
  req.logger.info('Hola desde el request index home 😁 (info)');
  req.logger.warn('Hola desde el request index home 😁 (warn)');
  req.logger.error('Hola desde el request index home 😁 (error)');
  res.send('Hello Coder House 🖐️');
});

export default router;
