const fs = require('fs').promises;
const path = require('path');

class CartsService {
  constructor() {
    this.path = path.join(__dirname, '../data/carts.json');
    this.carts = [];
    this.loadCarts();
  }

  async loadCarts() {
    try {
      const data = await fs.readFile(this.path, 'utf-8');
      this.carts = JSON.parse(data);
    } catch (error) {
      this.carts = [];
      await this.saveCarts(); // si no existe el archivo, lo crea vacío
    }
  }

  async saveCarts() {
    await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
  }

  async createCart() {
    const newId = this.carts.length > 0
      ? parseInt(this.carts[this.carts.length - 1].id) + 1
      : 1;

    const newCart = { id: newId.toString(), products: [] };
    this.carts.push(newCart);
    await this.saveCarts();
    return newCart;
  }

  async getCartProducts(cartId) {
    const cart = this.carts.find(c => String(c.id) === String(cartId));
    return cart ? cart.products : null;
  }

  async addProductToCart(cartId, productId) {
    const cart = this.carts.find(c => String(c.id) === String(cartId));
    if (!cart) return null;

    const existingProduct = cart.products.find(p => String(p.product) === String(productId));

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    await this.saveCarts();
    return cart;
  }
}

module.exports = CartsService;
