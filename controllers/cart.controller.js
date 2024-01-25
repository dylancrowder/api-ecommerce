import CartService from "../services/cart.service.js";
import UserService from "../services/user.service.js";
import ProductService from "../services/products.service.js";

export default class CartsController {
  static async getById(cartId) {
    try {
      const cart = await CartService.getByIdCart(cartId);
      if (!cart) {
        throw new Error("Carrito no encontrado");
      }

      console.log("este es el carro ", cart);
      return cart;
    } catch (error) {
      throw new Error("Error al obtener el carrito: " + error.message);
    }
  }

  static async addToCart(userId, productId) {
    try {
      const user = await UserService.findById(userId);


      let cart = await CartService.getByIdCart(user._id);

      const product = await ProductService.getById(productId);

      if (!cart) {
        cart = await CartService.createOne(user._id);
      }
      const existingProductIndex = cart.products.findIndex((item) =>
        item.product.equals(product._id)
      );

      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
        cart.products.push({ product: product._id, quantity: 1 });
      }

      await cart.save();

      return {
        success: true,
        message: "Producto agregado al carrito con éxito."
      };
    } catch (error) {
      console.error("Error al agregar el producto al carrito:", error);
      return { success: false, error: "Error interno del servidor." };
    }
  }
}
