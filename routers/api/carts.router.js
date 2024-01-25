import { Router } from "express";
import CartsController from "../../controllers/cart.controller.js";
import TicketController from "../../controllers/ticket.controller.js";
const router = Router();

/* mostrar el carrito */
router.get("/cartsview/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await CartsController.getById(cid);

    if (!cart) {
      return res
        .status(404)
        .render("error", { message: "Carrito no encontrado" });
    }


    res.render("cart", { cart: cart.toJSON(), title: "carrito" });
  } catch (error) {
    console.error(error.message);
    res.status(500).render("error", { message: "Error al obtener el carrito" });
  }
});

router.post("/add-to-cart/:productId", async (req, res) => {
  try {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { productId } = req.params;
    const userId = req.user._id;

    console.log(`Adding product ${productId} to the cart for user ${userId}`);

    const result = await CartsController.addToCart(userId, productId);

    if (result.success) {
      console.log(`Product added successfully: ${result.message}`);
      return res.json({ message: result.message });
    } else {
      console.error(`Error adding product to cart: ${result.error}`);
      return res.status(500).json({ error: result.error });
    }
  } catch (error) {
    console.error(`An unexpected error occurred: ${error}`);
    return res.status(500).json({ error: "Error interno del servidor" });
  }
});



router.get("/purcherase/:cid", async (req, res) => {
  const { cid } = req.params

  const ticket = await TicketController.generateTicket(cid)

  res.status(200).json({ ticket })


})
export default router;
