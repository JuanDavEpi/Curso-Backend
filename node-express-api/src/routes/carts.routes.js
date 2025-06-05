const express = require('express');
const router = express.Router();
const CartsController = require('../controllers/carts.controller');
const CartsService = require('../services/carts.service');
const cartsService = new CartsService();
const cartsController = new CartsController(cartsService);

router.get('/', cartsController.getAllCarts.bind(cartsController));
router.post('/', cartsController.createCart.bind(cartsController));
router.get('/:cid', cartsController.getCartProducts.bind(cartsController));
router.post('/:cid/product/:pid', cartsController.addProductToCart.bind(cartsController));

module.exports = router;
