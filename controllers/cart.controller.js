import CartService from "../services/cart.service.js";
import UserService from "../services/user.service.js";
import ProductService from "../services/products.service.js";

export default class CartsController {
  static async getById(cartId) {

    const cart = await CartService.getByIdCart(cartId);

    return cart;


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

  static async deleteOne(uid, productId) {
    // Obtener el carrito actual del usuario
    const getCart = await CartService.getByIdCart(uid);

    const deleteProduct = getCart.products.findIndex(producto => producto.id === productId);

    // Verificar si se encontró el producto
    if (deleteProduct !== -1) {

      getCart.products.splice(deleteProduct, 1);
      console.log(`Producto con ID ${productId} eliminado.`);
    } else {
      console.log(`No se encontró un producto con ID ${productId}.`);
    }


    const updateCart = await CartService.updateOne(uid, getCart.products);

    return updateCart;
  }

}

