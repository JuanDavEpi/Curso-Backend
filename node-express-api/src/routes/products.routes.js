const express = require('express');
const router = express.Router();
const ProductsService = require('../services/products.service');
const ProductsController = require('../controllers/products.controller');

const productsService = new ProductsService();
const productsController = new ProductsController(productsService);

router.get('/', productsController.getAllProducts.bind(productsController));
router.get('/:pid', productsController.getProductById.bind(productsController));
router.post('/', productsController.addProduct.bind(productsController));
router.put('/:pid', productsController.updateProduct.bind(productsController));
router.delete('/:pid', productsController.deleteProduct.bind(productsController));

module.exports = router;


// 📁 src/controllers/products.controller.js
class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }

  async getAllProducts(req, res) {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      const result = await this.productsService.getAll({ limit, page, sort, query });
      res.status(200).json({
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? `/api/products?page=${result.prevPage}` : null,
        nextLink: result.hasNextPage ? `/api/products?page=${result.nextPage}` : null,
      });
    } catch (error) {
      res.status(500).json({ message: 'Error recuperando productos', error });
    }
  }

  async getProductById(req, res) {
    const { pid } = req.params;
    try {
      const product = await this.productsService.getById(pid);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error recuperando el producto', error });
    }
  }

  async addProduct(req, res) {
    try {
      const newProduct = req.body;
      const createdProduct = await this.productsService.add(newProduct);
      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error añadiendo el producto', error });
    }
  }

  async updateProduct(req, res) {
    const { pid } = req.params;
    const updatedProduct = req.body;
    try {
      const result = await this.productsService.update(pid, updatedProduct);
      if (result) {
        res.json(result);
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error actualizando el producto', error });
    }
  }

  async deleteProduct(req, res) {
    const { pid } = req.params;
    try {
      const result = await this.productsService.delete(pid);
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: 'Producto no encontrado' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error borrando el producto', error });
    }
  }
}

module.exports = ProductsController;