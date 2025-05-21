const express = require('express');
const CartsService = require('../services/carts.service');
const CartsController = require('../controllers/carts.controller');

const router = express.Router();
const cartsService = new CartsService();
const cartsController = new CartsController(cartsService);

router.get('/', cartsController.getAllCarts.bind(cartsController));

module.exports = router;
