import EmailService from "../services/email.service.js";
import ProductService from "../services/products.service.js";
import UserService from "../services/user.service.js";
export default class ProductController {
  static getALL() {
    const criteria = {};
    const options = { limit: 10, page: 1, sort: "desc" };
    return ProductService.getAll(criteria, options);
  }

  static async getById(id) {
    const product = await ProductService.getById(id);
    if (!product) {
      throw new NotFoundException(`Usuario ${id} no encontrado 😱`);
    }
    return product;
  }

  static async create(data) {
    const { title, description, thumbnail, size, price, code, stock, userEmail, role } = data;

    const newProduct = {
      title,
      description,
      thumbnail,
      size,
      price,
      code,
      stock,
      owner: {
        email: userEmail,
        role: role
      }
    };
    return await ProductService.create(newProduct);
  }


  static async deleteOne(pid, uid) {
    const user = await UserService.findById(uid);

    if (!user) {
      throw new NotFoundException(`Usuario ${uid} no encontrado 😱`);
    }

    const product = await ProductService.getById(pid);

    if (!product) {
      throw new NotFoundException(`Producto ${pid} no encontrado 😱`);
    }

    // Verificar si el usuario es premium y si el producto le pertenece
    if (user.role === 'premium' && product.owner.email !== user.email) {
      throw new ForbiddenException('No tienes permiso para borrar este producto');
    }

    // El administrador puede borrar cualquier producto
    if (user.role === 'admin') {
      if (product.owner.role === "premium") {

        const emailService = EmailService.getInstance();
        const result = await emailService.sendEmail(
          product.owner.email,
          'producto eliminado',
          `<div>
              <h1>producto eliminado</h1>
              <p>tu producto a sido removido correctamente</p>
             
            </div>`,
        );

      }
      const deletedProduct = await ProductService.deleteOne({ _id: pid });

      if (!deletedProduct) {
        throw new NotFoundException(`Producto ${pid} no encontrado 😱`);
      }

      return deletedProduct;
    }

    // Si el usuario es el propietario del producto o es premium y le pertenece, se permite borrar
    if (user.email === product.owner.email || (user.role === 'premium' && user.email === product.owner.email)) {
      const deletedProduct = await ProductService.deleteOne({ _id: pid });

      if (!deletedProduct) {
        throw new NotFoundException(`Producto ${pid} no encontrado 😱`);
      }

      return deletedProduct;
    } else {
      throw new ForbiddenException('No tienes permiso para borrar este producto');
    }
  }

}