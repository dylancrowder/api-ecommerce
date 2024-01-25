import { Router } from "express";
import ProductController from "../../controllers/products.controller.js";
import productsModel from "../../dao/models/products.model.js";

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
    const product = await ProductController.create(req.body);
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
      // Product successfully deleted
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
