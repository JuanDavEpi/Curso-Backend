const express = require('express');
const app = express();
const CartManager = require('./managers/CartManager'); 
const cartManager = new CartManager(); 

app.use(express.json());

app.get('/api/carts', (req, res) => {
  const newCart = cartManager.createCart(); 
  res.status(201).json(newCart); 
});
app.listen(8080, () => {
  console.log('Servidor en puerto 8080');
});
