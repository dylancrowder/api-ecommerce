import ProductService from "../services/products.service.js";
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
    const { title, description, thumbnail, size, price, code, stock } = data;

    const newProduct = {
      title,
      description,
      thumbnail,
      size,
      price,
      code,
      stock
    };
    return await ProductService.create(newProduct);
  }


  static async deleteOne(pid) {
    const product = await ProductService.deleteOne(pid)
    if (!product) {
      throw new NotFoundException(`Usuario ${pid} no encontrado 😱`);
    }
    return product
  }
}
