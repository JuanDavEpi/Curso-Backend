const express = require('express');
const router = express.Router();
const ProductManager = require('../managers/ProductManager');

const productManager = new ProductManager();

router.get('/', (req, res) => {
  const products = productManager.getAllProducts();
  res.render('home', { products });
});

module.exports = router;
