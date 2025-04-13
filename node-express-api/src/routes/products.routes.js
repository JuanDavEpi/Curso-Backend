const express = require('express');
const ProductsService = require('../services/products.service');
const ProductsController = require('../controllers/products.controller');

const router = express.Router();
const productsService = new ProductsService();
const productsController = new ProductsController(productsService);

router.get('/', productsController.getAllProducts.bind(productsController));
router.get('/:pid', productsController.getProductById.bind(productsController));
router.post('/', productsController.addProduct.bind(productsController));
router.put('/:pid', productsController.updateProduct.bind(productsController));
router.delete('/:pid', productsController.deleteProduct.bind(productsController));

module.exports = router;
