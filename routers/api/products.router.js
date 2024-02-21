import { Router } from "express";
import ProductController from "../../controllers/products.controller.js";
import { generatorUserError } from "../../errors/CauseMessageError.js";
import { CustomError } from "../../errors/CustomError.js";
import EnumsError from "../../errors/EnumsError.js";
const router = Router();

router.get("/products", async (req, res) => {
  try {
    const { limit, page, sort, search } = req.query;
    const products = await ProductController.getALL({
      limit,
      page,
      sort,
      search
    });
    res.status(200).render("createProducts", products)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/editUser", async (req, res) => {
  try {
    const user = req.user

    res.status(200).render("editUser", user)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get("/getProduct/:pid", async (req, res, next) => {
  try {
    const { pid } = req.params;
    const product = await ProductController.getById(pid);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/product", async (req, res, next) => {
  try {
    const { data } = req.body

    const {
      title,
      description,
      thumbnail,
      size,
      price,
      code,
      stock } = data


    if (!title ||
      !description ||
      !thumbnail ||
      !size ||
      !price ||
      isNaN(price) ||
      !code ||
      isNaN(code) ||
      !stock ||
      isNaN(stock)) {

      CustomError.create({
        name: 'no llega la data',
        cause: generatorUserError({
          title,
          description,
          thumbnail,
          size,
          price,
          code,
          stock
        }),
        message: 'no se recibieron los datos',
        code: EnumsError.BAD_REQUEST_ERROR,
      });

      throw error;
    }



    const product = await ProductController.create(data);



    res.status(201).render(product);
  } catch (error) {
    next(error);
  }
});



router.delete("/deleteProduct/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const result = await ProductController.deleteOne({ _id: pid });

    if (result.deletedCount === 1) {

      res.status(200).json({ message: 'Product deleted successfully' });
    } else {
      // Product not found
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});




export default router;
