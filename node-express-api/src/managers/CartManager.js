const fs = require('fs');
const Cart = require('../controllers/carts.controller.js');  

class CartManager {
  constructor() {
    this.carts = [];  // 
    this.loadCarts();  //! carga el carro
  }

  //? carga desde archivo
  loadCarts() {
    if (fs.existsSync('carts.json')) {
      const data = fs.readFileSync('carts.json', 'utf-8');
      this.carts = JSON.parse(data);
    }
  }

  //! Guardar los carritos 
  saveCarts() {
    fs.writeFileSync('carts.json', JSON.stringify(this.carts, null, 2), 'utf-8');
  }

  //! crear un nuevo carrito
  createCart() {
    const newCart = new Cart(this.generateId()); 
    this.carts.push(newCart);
    this.saveCarts();
    return newCart;  
  }

  addProductToCart(cartId, productId, quantity) {
    const cart = this.carts.find(c => c.id === cartId); 
    if (!cart) return null;  

    // !buscar producto en el carro
    const productIndex = cart.products.findIndex(p => p.productId === productId);
    
    if (productIndex !== -1) {

      cart.products[productIndex].quantity += quantity;
    } else {
 
      cart.products.push({ productId, quantity });
    }

    this.saveCarts(); 
    return cart;  
  }


  generateId() {
    return (Math.random() + 1).toString(36).substring(2, 15);  //* id aleatorio
  }
}

module.exports = CartManager;
